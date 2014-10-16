var gulp         = require('gulp');
var gutil        = require('gulp-util');
var concat       = require('gulp-concat');

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
  var process = debug ? gutil.noop : minifyCss;

  return gulp
    .src([ 'src/widgets.scss' ])
    .pipe(sass({
      sourceMap: 'scss',
      sourceComments: 'normal',
      precision: 10,
      imagePath: 'images'
    }))
    .pipe(concat('widgets.css'))
    .pipe(autoprefixer())
    .pipe(process())
    .pipe(gulp.dest('public'));
});

gulp.task('scripts', function() {
  var process = debug ? gutil.noop : uglify;

  return gulp
    .src([ 'src/widgets.js' ], { read: false })
    .pipe(browserify())
    .pipe(process())
    .pipe(gulp.dest('public'));
});

gulp.task('build', [ 'styles', 'scripts' ], function() {});
gulp.task('default', [ 'styles', 'scripts' ], function() {});

gulp.task('watch', function() {
  gulp.watch('src/**/*.scss', [ 'styles' ]);
  gulp.watch('src/**/*.js', [ 'scripts' ]);
});
