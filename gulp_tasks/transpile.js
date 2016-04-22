var gulp = require("gulp");
var babel = require("gulp-babel");
var clean = require('gulp-clean');
var sourceDirectories = [
  "src",
  "scss",
];

var sourceMatcher = `{${sourceDirectories.join(",")}}`;
var destination = 'dist';

gulp.task("transpile", ['build-transpile'], function() {
  return gulp.src( destination + '/src', {read: false})
    .pipe(clean());
});

gulp.task("build-transpile", ['transpile-js', 'transpile-scss', 'transpile-images'], function() {
  return gulp.src(['package.json', destination + '/src/**/*.*']).pipe(gulp.dest(destination));
});


gulp.task("transpile-js", function () {
  return gulp.src([
      `src/**/*.js`,
      `!src/**/*-test.js`,
    ])
    .pipe(babel())
    .pipe(gulp.dest(destination));
});

gulp.task('transpile-scss', function() {
  return gulp
    .src([`${sourceMatcher}/**/*.{scss,sass}`, 'common.scss', 'assets.scss'])
    .pipe(gulp.dest(destination))
});

gulp.task('transpile-images', function() {
  return gulp
    .src('./images/*')
    .pipe(gulp.dest(`${destination}/images`));
});
