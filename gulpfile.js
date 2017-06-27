var gulp = require('gulp');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');

gulp.task('build', ()=>{
    gulp.src('server/src/**/*.ts')
    .pipe(ts())
    .pipe(gulp.dest('server/build/'));
})
gulp.task('watch', ()=>{
    gulp.watch('server/src/**/*.ts', ['build']);
})
gulp.task('start', function () {
  nodemon({
    script: 'server/build/server.js',
    env: { 'NODE_ENV': 'development' }
  })
})
gulp.task('default', ['build', 'watch', 'start']);