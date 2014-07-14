var gulp = require('gulp'),
browserify = require('browserify'),
vinyl = require('vinyl-source-stream');




gulp.task('js', function () {
		return browserify('./src/js/main.js')
			.bundle()
			.pipe(vinyl('main.js'))
			//.pipe( streamify( uglify() ) )
			.pipe(gulp.dest('./dist/js'));
});

gulp.task('default', ['js']);
