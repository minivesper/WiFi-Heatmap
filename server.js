
var fs   = require( 'fs' );
var http = require( 'http' );
var url_utils = require( './url_utils.js' );
var data_ops = require( './read_data_csv.js.js' );


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
    catch( exp ) {
        return false;
    }
}

function serveDynamic( req, res )
{
    var kvs = url_utils.getFormValuesFromURL( req.url );
    if( req.url.indexOf( "refresh?" ) >= 0 )
    {
      var db = new sql.Database( 'data.sqlite' );
            db.all( "SELECT * FROM Nodes",
                function( err, rows ) {
                    res.writeHead( 200 );
                    var resp_text = "";
                    for( var i = 0; i < rows.length; i++ )
                    {
                        resp_text += rows[i].ID + "," + rows[i].L1 +  "," + rows[i].L2;

                    }
                    res.end( resp_text );
                } );
    }
    else
    {
        res.writeHead( 404 );
        res.end( "Unknown URL: "+req.url );
    }
}

function serverFun( req, res )
{
    console.log( "The URL: '", req.url, "'" );
    var file_worked = serveFile( req, res );
    if( file_worked )
        return;

    serveDynamic( req, res );
}

function init()
{
    var server = http.createServer( serverFun );
    
    server.listen( 8080 );
}

init();
