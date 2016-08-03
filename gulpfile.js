var gulp = require('gulp');
var webpack = require('webpack-stream');
gulp.task('default', function () {
    return gulp.src('./index.ts')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('lib/'));
});