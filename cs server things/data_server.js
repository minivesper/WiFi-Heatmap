var http = require( 'http' );
var fs = require( 'fs' );

function serverFun( req, res )
{
    console.log( "The URL: '", req.url, "'" );
    var file_worked = serveFile( req, res );
    if( file_worked )
        return;
}

function serveFile( req, res )
{
    if( req.url === "/" || req.url === "/index.htm" )
    {
        req.url = "/index.html";
    }
    var filename = "./" + req.url;
    try {
        var contents = fs.readFileSync( filename ).toString();
        res.writeHead( 200 );
        res.end( contents );
        return true;
    }
    catch( exp )
    {
        console.log("no file exists");
        return false;
    }
}
var server = http.createServer( serverFun );

server.listen( 8900 );
