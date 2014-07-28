var gulp = require('gulp'),
browserify = require('browserify'),
connect = require('gulp-connect'),
vinyl = require('vinyl-source-stream');



gulp.task('server', function () {
	connect.server({
		root : 'dist'
	});
});

gulp.task('js', function () {
		return browserify('./src/js/main.js')
			.bundle()
			.pipe(vinyl('main.js'))
			//.pipe( streamify( uglify() ) )
			.pipe(gulp.dest('./dist/js'));
});

gulp.task('default', ['js']);
