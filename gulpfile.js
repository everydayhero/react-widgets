var gulp         = require('gulp');
var gutil        = require('gulp-util');
var concat       = require('gulp-concat');
var awspublish   = require('gulp-awspublish');
var rename       = require('gulp-rename');
var pkg          = require('./package.json');

// stylesheets
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss    = require('gulp-minify-css');

// javascripts
var browserify   = require('gulp-browserify');
var uglify       = require('gulp-uglify');

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

gulp.task('scripts', function() {
  var processor = debug ? gutil.noop : uglify;

  return gulp
    .src([ 'src/widgets.js' ], { read: false })
    .pipe(browserify())
    .pipe(processor())
    .pipe(rename('widgets-' + pkg.version + '.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('build', [ 'styles', 'scripts' ], function() {});
gulp.task('default', [ 'styles', 'scripts' ], function() {});

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

  return gulp.src('./public/widgets-' + pkg.version + '.*')
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});
