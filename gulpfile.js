var gulp = require('gulp');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');

gulp.task('build', ()=>{
    return gulp.src('server/src/**/*.ts')
    .pipe(ts())
    .pipe(gulp.dest('server/build/'));
})
gulp.task('watch', ['build'], ()=>{
    return gulp.watch('server/src/**/*.ts', ['build']);
});
gulp.task('server', ['build', 'watch'], function(){
    return nodemon({
            script: 'server/build/server.js',
            env: { 'NODE_ENV': 'development' }
        });
})
gulp.task('default', ['build', 'watch', 'server']);