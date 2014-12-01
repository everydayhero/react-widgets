var gulp         = require('gulp');
var gutil        = require('gulp-util');
var concat       = require('gulp-concat');
var awspublish   = require('gulp-awspublish');
var rename       = require('gulp-rename');
var pkg          = require('./package.json');
var request      = require('superagent');
var fs           = require('fs');

// stylesheets
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss    = require('gulp-minify-css');

// javascripts
var browserify   = require('gulp-browserify');
var uglify       = require('gulp-uglify');
var react        = require('gulp-react');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');

// html
var inject       = require("gulp-inject");

var debug        = !!gutil.env.debug;

if (debug) {
  process.env.NODE_ENV = 'development';
}

gulp.task('styles', function() {
  var processor = debug ? gutil.noop : minifyCss;

  return gulp
    .src([ 'src/widgets.scss' ])
    .pipe(sass({
      sourceMap: 'scss',
      sourceComments: 'normal',
      precision: 10,
      imagePath: 'images'
    }))
    .pipe(autoprefixer())
    .pipe(processor())
    .pipe(rename('widgets-' + pkg.version + '.css'))
    .pipe(gulp.dest('public'));
});

gulp.task('lint', function() {
  var jshintConfig = require('./package').jshintConfig;

  jshintConfig.lookup = false;

  return gulp
    .src([ 'src/**/*.js' ])
    .pipe(react())
    .on('error', function(e) {
      // Need better logging here
      console.log(e)
    })
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish))
});

gulp.task('scripts', [ 'lint' ], function() {
  var processor = debug ? gutil.noop : uglify;

  return gulp
    .src([ 'src/widgets.js' ], { read: false })
    .pipe(browserify())
    .pipe(processor())
    .pipe(rename('widgets-' + pkg.version + '.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('markdown', function() {
  return processMarkdown();
});

gulp.task('default', [ 'styles', 'scripts', 'markdown' ], function() {
  var sources = gulp.src([
      'public/widgets-' + pkg.version + '.*'
    ], { read: false });

  return gulp
    .src('src/index.html')
    .pipe(inject(sources, {
      transform: function(filepath, file, i, length) {
        // remove `/public` from the filepath
        filepath = '/' + filepath.split('/').slice(2).join('/');
        return inject.transform(filepath, file, i, length);
      }
    }))
    .pipe(rename('widgets-' + pkg.version + '.html'))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.scss', [ 'styles' ]);
  gulp.watch('src/**/*.js', [ 'scripts' ]);
});


gulp.task('publish', function() {
  if (!process.env.AWS_KEY || !process.env.AWS_SECRET) {
    console.error('ERROR: No AWS credentials found.');
    return;
  }
  var publisher = awspublish.create({
    key: process.env.AWS_KEY,
    secret: process.env.AWS_SECRET,
    bucket: 'shared-scripts'
  });

  var headers = {
     'Cache-Control': 'max-age=315360000, no-transform, public'
   };

  return gulp.src(['./public/widgets-' + pkg.version + '.*', './public/README-' + pkg.version + '.html'])
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});

function processMarkdown() {
  var markdown = fs.readFileSync('README.md', 'utf8');
  var template = fs.readFileSync('./src/README-template.html', 'utf8');

  function end(error, res){
    var templateArray = template.split('{{content}}');
    var readme = templateArray[0] + res.text + templateArray[1];
    fs.writeFile('./public/README-' + pkg.version + '.html', readme , "utf8", function (err) {
      if (err) { throw err};
    });
  };

  request.post('https://api.github.com/markdown')
         .send({
            "text": markdown,
            "mode": "markdown",
          })
         .end(end);
}
