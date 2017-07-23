const gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' );

gulp.task( 'css2sass' , function () {
    return gulp.src( '../app/sass/*.sass' )
        .pipe( sass() )
        .pipe( gulp.dest( '../app/css/' ) )
});

gulp.task( 'watch ', function () {
    gulp.watch( '../app/sass/*.sass' , ['css2sass'] );
});

