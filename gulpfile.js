var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var del = require('del');

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

var assets = {
    main: 'convergame.js',
    minified: 'convergame.min.js'
};

gulp.task('clean', function (cb) {
    del([assets.minified], cb);
});

gulp.task('jshint', function () {
    return gulp.src('./' + assets.main)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('uglify', ['clean'], function () {
    return gulp.src('./' + assets.main)
        .pipe(uglify(uglifySettings))
        .pipe(rename(assets.minified))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
    gulp.watch('./' + assets.main, ['jshint', 'uglify']);
});

gulp.task('default', ['jshint', 'uglify']);
