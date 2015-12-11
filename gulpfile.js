var gulp = require('gulp');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');

gulp.task('jsx',function(){
    return browserify({
		entries:'./main.jsx',
	})
	.transform(babelify)
	.bundle()
	.pipe(source('main.js'))
	.pipe(gulp.dest('./'));
});

gulp.task('dev',['jsx'],function(){
    gulp.watch('./main.jsx',['jsx'])
})