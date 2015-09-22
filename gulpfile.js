/* REQUIREMENTS */
var gulp = require('gulp'),
jshint = require('gulp-jshint'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
gp_concat = require('gulp-concat'),
del = require('del');

/* SETTINGS */
var uglifySettings = {
    compress: {
        comparisons: true,
        conditionals: true,
        dead_code: true,
        drop_console: true,
        unsafe: true,
        unused: true
    }
};

/*ASSETS*/
var assets = {
    main:['convergame.js', 'ConvergameComponents/*'],
    minified: 'convergame.min.js'
};

/* GULP TASKS */
gulp.task('clean', function (cb) {
    del([assets.minified], cb);
});

gulp.task('jshint', function () {
    return gulp.src(assets.main)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('uglify', function () {
    return gulp.src(assets.main)
        .pipe(uglify(uglifySettings))
        .pipe(gp_concat(assets.minified))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
    gulp.watch(assets.main, ['jshint', 'uglify']);
});

gulp.task('default', ['jshint', 'uglify']);
