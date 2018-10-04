/*!
 * Bootstrap 4 Development Starter Pack
 * Author: Komputronika
 * Homepage: https://github.com/komputronika/bootstrap4starter
 * Licensed under MIT 
 */

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var autoprefixer= require('gulp-autoprefixer');
var cleanCSS    = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

// Set folder's consts
const nodeFolder= 'node_modules/';
const srcFolder = 'src/';
const distFolder= 'assets/';

// Set the browser that we want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Gulp task to compile .scss and minify CSS files
gulp.task('sass', function () {
    return gulp.src([nodeFolder + 'bootstrap/scss/bootstrap.scss', srcFolder + 'scss/**/*.scss'])
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest(distFolder + 'css'))
        .pipe(browserSync.stream());
});

// Move the javascript files into /assets/js folder
gulp.task('js', function() {
    return gulp.src([nodeFolder + 'bootstrap/dist/js/bootstrap.min.js', 
                     nodeFolder + 'jquery/dist/jquery.min.js', 
                     nodeFolder + 'popper.js/dist/popper.min.js'])
        .pipe(gulp.dest(distFolder + 'js'))
        .pipe(browserSync.stream());
});

// Start server and watch scss + html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }  
    });
    gulp.watch([nodeFolder + 'bootstrap/scss/*.scss', srcFolder + 'scss/*.scss'], ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


gulp.task('default', ['js','serve']);