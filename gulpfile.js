/* REQUIREMENTS */
var gulp = require('gulp'),
jshint = require('gulp-jshint'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
gp_concat = require('gulp-concat');

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
    main:['convergame.js', 'components/*', 'persistentScenes/*', 'basicObjects/*'],
    minified: 'convergame.min.js'
};

/* GULP TASKS */

gulp.task('jshint', function () {
    return gulp.src(assets.main)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-dev', ['jshint'], function () {
    return gulp.src(assets.main)
        .pipe(gp_concat(assets.minified))
        .pipe(gulp.dest('./'));
});

gulp.task('build', ['jshint'], function () {
    return gulp.src(assets.main)
        .pipe(gp_concat(assets.minified))
        .pipe(uglify(uglifySettings))
        .pipe(gulp.dest('./'));
});

//Old alias
gulp.task('uglify', ['build-dev']);

gulp.task('watch', function () {
    gulp.watch(assets.main, ['jshint', 'uglify']);
});

gulp.task('default', ['jshint', 'uglify']);
