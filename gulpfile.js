var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var notify = require ('gulp-notify');
var autoprefixer = require ('gulp-autoprefixer');
var plumber = require('gulp-plumber');

gulp.task('css', function(){
	var onError = function(err) {
		notify.onError({
			title:    "Gulp",
			subtitle: "You done fucked up!",
			message:  "Error: <%= error.message %>",
			sound:    "Frog"
		})(err);

		this.emit('end');
	};
	return gulp.src('css/scss/screen.scss')
		.pipe(plumber({errorHandler: onError}))
		.pipe(sass({ style: 'compressed' }))
		.pipe(autoprefixer('last 1 version'))
		.pipe(gulp.dest('css/'))
		.pipe(notify({
			title: 'Gulp',
			subtitle: 'Huzzah!',
			message: 'Sass Complied',
			sound: "Pop"
		})
	);
});

 gulp.task('watch', function(){
	gulp.watch('css/scss/**/*.scss', ['css']);
 });

gulp.task('default', ['css', 'watch']);