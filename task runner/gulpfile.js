const gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    babel = require( 'gulp-babel' );

/**
 * Create task to compile SASS to CSS
 */
gulp.task( 'css2sass' , function () {
    return gulp.src( '../app/sass/*.sass' )
        .pipe( sass() )
        .pipe( gulp.dest( '../app/css' ) )
});

/**
 * Create task to compile ES6 to ES2015
 */
gulp.task( 'babel' , function () {
    return gulp.src( '../app/js/lib/content-es6.js' )
        .pipe( babel({ presets: ['babel-preset-es2015'].map(require.resolve) }) )
        .pipe( gulp.dest( "../app/js/lib/dist" ) );
});

/**
 * Create task to watch files for changes
 * Before watching files run sass and babel tasks
 */
gulp.task( 'watch ', ['sass', 'babel'], function () {
    gulp.watch( '../app/sass/*.sass' , ['css2sass'] );
    gulp.watch( '../app/js/lib/content-es6.js' , ['babel'] );
});

