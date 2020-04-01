'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
var server = require('browser-sync').create();
var pug = require('gulp-pug');
var gulp = require('gulp');
var inlineCss = require('gulp-inline-css');
 


gulp.task('serve', function(cb){
  server.init({
    server: 'dist',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('src/**/*.{scss,sass}', gulp.series('style')).on('change', server.reload);
  gulp.watch('src/pug/**/*.pug', gulp.series('views')).on('change', server.reload);
  gulp.watch('src/js/*.js', gulp.series('copyjs')).on('change', server.reload);
  gulp.watch('src/assets/img/*.*', gulp.series('copyimg')).on('change', server.reload);
  cb;
});

// Css inline
gulp.task('inline', function() {
  return gulp.src('dist/*.html')
      .pipe(inlineCss())
      .pipe(gulp.dest('dist/email-ready/'));
});

//Pug
gulp.task('views', function buildHTML() {
  return gulp.src('src/pug/pages/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('style', function(){
  return gulp.src('src/assets/scss/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(server.stream());
});

gulp.task('scripts', function(){
  return gulp.src('js/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copyjs', function () {
  return gulp.src('src/js/*.js')
             .pipe(gulp.dest('dist/js/'));
});

gulp.task('copyimg', function () {
  return gulp.src('src/assets/img/*.*')
             .pipe(gulp.dest('dist/img/'));
});

gulp.task('copyicons', function () {
  return gulp.src('src/assets/img/icons/*.*')
             .pipe(gulp.dest('dist/img/icons'));
});

gulp.task('copycss', function () {
  return gulp.src('src/assets/css/*.css')
             .pipe(gulp.dest('dist/css/'));
});


// Init

gulp.task('dev', gulp.series('style', 'views', 'copyjs', 'copyimg', 'copyicons', 'copycss', 'serve'));