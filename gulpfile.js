'use strict';

var gulp         = require('gulp');
var gutil        = require('gulp-util');
var concat       = require('gulp-concat');
var awspublish   = require('gulp-awspublish');
var rename       = require('gulp-rename');
var pkg          = require('./package');
var request      = require('superagent');
var fs           = require('fs');

// stylesheets
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss    = require('gulp-minify-css');

// javascripts
var browserify   = require('browserify');
var uglify       = require('gulp-uglify');
var react        = require('gulp-react');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var buffer       = require('vinyl-buffer');
var source       = require('vinyl-source-stream');

// html
var inject       = require("gulp-inject");

var debug        = !!gutil.env.debug;

if (debug) {
  process.env.NODE_ENV = 'development';
}

gulp.task('default', [ 'assets', 'styles', 'scripts', 'examples', 'markdown' ]);

gulp.task('watch', function() {
  gulp.watch('src/images/*', [ 'assets' ]);
  gulp.watch('src/**/*.scss', [ 'styles' ]);
  gulp.watch('src/**/*.js', [ 'scripts' ]);
  gulp.watch('src/index.html', [ 'examples' ]);
  gulp.watch(['README.md', 'src/README-template.html'], [ 'markdown' ]);
});

gulp.task('assets', [ 'images' ]);

gulp.task('images', function() {
  return gulp
    .src('src/images/*', {base: 'src/images'})
    .pipe(rename({
      prefix: 'widgets-',
      suffix: '-' + pkg.version
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('styles', function() {
  var processor = debug ? gutil.noop : minifyCss;

  fs.writeFileSync('src/scss/_version.scss', '$version: "' + pkg.version + '";');

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

gulp.task('jshint', function() {
  var jshintConfig = pkg.jshintConfig;

  return gulp
    .src([ 'src/**/*.js' ])
    .pipe(react())
    .on('error', console.log.bind(console))
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish))
});

gulp.task('scripts', [ 'jshint' ], function() {
  var processor = debug ? gutil.noop : uglify;

  var bundler = browserify({
    entries: ['./src/widgets.js'],
    standalone: 'edh.widgets',
    debug: debug
  });

  return bundler
    .bundle()
    .on('error', console.log.bind(console))
    .pipe(source('widgets-' + pkg.version + '.js'))
    .pipe(buffer())
    .pipe(processor())
    .pipe(gulp.dest('public'));
});

gulp.task('examples', [ 'styles', 'scripts' ], function() {
  var sources = gulp.src([
      'public/widgets-' + pkg.version + '.css',
      'public/widgets-' + pkg.version + '.js'
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

  return gulp.src(['./public/widgets-*' + pkg.version + '.*', './public/README-' + pkg.version + '.html'])
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});

gulp.task('markdown', function() {
  return processMarkdown();
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
