var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

//Default
gulp.task('default',function () {
    gulp.src('src/public/*')
        .pipe(gulp.dest('dist/public/'));
});

// Optimize Images
gulp.task('imageMin', function () {
    gulp.src('src/public/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/public/images'));
});