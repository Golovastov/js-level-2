var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    minify = require('gulp-minify'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin');

var config = {
    app: './app',
    dist: './dist'
};

gulp.task('htmlmin', function () {
    return gulp.src(config.app + '/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(config.dist));
});

gulp.task('compress', function () {
    gulp.src(config.app + '/js/*.js')
        .pipe(minify({
            ext: {
                min: '.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest(config.dist + '/js'))
});

gulp.task('imgmin', function () {
    return gulp.src(config.app + '/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest(config.dist + '/img'));
});

gulp.task('minify-css', function () {
    return gulp.src(config.app + '/style/*.css').pipe(cleanCSS({
        debug: true
    }, function (details) {
        console.log(details.name + ': ' + details.stats.originalSize);
        console.log(details.name + ': ' + details.stats.minifiedSize);
    })).pipe(gulp.dest(config.dist + '/style'));
});

gulp.task('default', ['htmlmin', 'compress', 'imgmin', 'minify-css'], function () {
    console.log('default task!');
});