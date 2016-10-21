var gulp = require('gulp')
var babel = require('gulp-babel')
var clean = require('gulp-clean')

var destination = 'dist'

gulp.task('clean', function () {
  return gulp.src(destination + '/src', {read: false})
    .pipe(clean())
})

gulp.task('transpile', ['transpile-js', 'transpile-scss', 'copy-images', 'copy-bin-stubs'], function () {
  return gulp.src(['package.json', 'README.md', 'index.html']).pipe(gulp.dest(destination))
})

gulp.task('transpile-js', function () {
  return gulp.src([
    `src/**/*.js`,
    `!src/**/*-test.js`
  ])
    .pipe(babel())
    .pipe(gulp.dest(destination + '/src'))
})

gulp.task('transpile-scss', function () {
  return gulp
    .src(['src/**/*.{scss,sass}', 'common.scss', 'assets.scss'])
    .pipe(gulp.dest(destination))
})

gulp.task('copy-images', function () {
  return gulp
    .src('./src/images/*')
    .pipe(gulp.dest(`${destination}/src/images`))
})

gulp.task('copy-bin-stubs', function () {
  return gulp
    .src('./bin/*')
    .pipe(gulp.dest(`${destination}/bin/`))
})
