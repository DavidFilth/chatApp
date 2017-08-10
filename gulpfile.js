var gulp = require('gulp');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');
var run = require('gulp-run');

gulp.task('build', ()=>{
    return gulp.src('server/src/**/*.ts')
    .pipe(ts())
    .pipe(gulp.dest('server/build/'));
})
gulp.task('watch', ['build'], ()=>{
    return gulp.watch('server/src/**/*.ts', ['build']);
});
gulp.task('runServer', ['build', 'watch'], function(){
    return nodemon({
            script: 'server/build/server.js',
            env: { 'NODE_ENV': 'development' }
        });
})
gulp.task('client', ()=>{
    return run('cd client && ng build --watch').exec() ;
});
gulp.task('server', ['build', 'watch', 'runServer']);
gulp.task('prod', ['build', 'watch', 'runServer', 'client']);
gulp.task('default', ['server'])