var gulp = require('gulp');

gulp.task('teste', function(){
	console.log('funcionou!');
});

var compass = require('gulp-compass');

gulp.task('sass', function(){
	gulp.src('./assets/sass/*.scss')
	.pipe(sass({compass: true}))
	.on('error', function(err) {console.log(err.message);})
	.pipe(gulp.dest('.dist/css'));
})

var imagemin = require('gulp-imagemin');
var changed  = require('gulp-changed');
 
gulp.task('jpg', function() {
    gulp.src('./assets/img/**/*.jpg')
        .pipe(changed('./dist/img/'))
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./dist/img/'));
});

var browserSync = require('browser-sync');
     
gulp.task('browser-sync', function() {
    browserSync.init(['./dist/css/**', './views/*.html'], {
        server: {
            baseDir: './',
            index: './views/index.html'
        }
    });
});

gulp.task('watch', ['compass', 'browser-sync'], function () { 
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});