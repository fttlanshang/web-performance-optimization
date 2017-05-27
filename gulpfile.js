// referencees: https://markpop.github.io/2014/09/17/Gulp%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/#

var gulp = require('gulp'),
    minifycss = require('gulp-clean-css'), //minify css
    jshint = require('gulp-jshint'),//js code check
    uglify = require('gulp-uglify'),//compressing js code
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    del = require('del');

gulp.task('styles', function(){
    return gulp.src('src/css/*.css')
        // .pipe(rename({suffix:'.min'})) //think rename is better, but I need to modidy the links in html files
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({message: 'style task compeleted'}));
});
gulp.task('view-styles', function(){
    return gulp.src('src/views/css/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist/views/css'))
        .pipe(notify({message: 'view-style task compeleted'}));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/perfmatters.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'scripts task compeleted'}));
});

gulp.task('view-scripts', function() {
    return gulp.src('src/views/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/views/js'))
        .pipe(notify({ message: 'view-scripts task compeleted'}));
});

gulp.task('images', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest('dist/img'))
        .pipe(notify({ message: "images task compeleted"}));
});

gulp.task('view-images', function() {
    return gulp.src('src/views/images/*')
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest('dist/views/images'))
        .pipe(notify({ message: "view-images task compeleted"}));
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});
gulp.task('view-html', function() {
    return gulp.src('src/views/pizza.html')
        .pipe(gulp.dest('dist/views'));
});

gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js', 'dist/img','dist/views/css', 'dist/views/js','dist/views/images'], cb);
});

gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'images', 'view-styles', 'view-scripts', 'view-images', 'html', 'view-html');
});

gulp.task('watch', function() {
    gulp.watch('css/*css',['styles']);
    gulp.watch('js/perfmatters.js', ['scripts']);
    gulp.watch('images/*', ['images']);
    gulp.watch('views/css/*css', ['views-styles']);
    gulp.watch('views/js/perfmatters.js', ['views-scripts']);
    gulp.watch('views/images/*', ['view-images']);
    livereload.listen();
    gulp.watch(['dist/**']).on('change', livereload.changed);
});

