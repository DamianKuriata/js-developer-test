const connect = require( 'connect' ),
		serveStatic = require( 'serve-static' );

connect()
		.use( serveStatic( '.' ) )
		.listen( 3000, () => {
			console.log( 'Server running on port 3000...' );
		} );