var gulp = require('gulp');
var uglify = require('gulp-uglify');
var del = require('del');

gulp.task('default', ['clean'], function(){
  gulp.start('build');
});

gulp.task('clean', function(){
  return del(['dist']);
});

gulp.task('build', function() {
  return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
