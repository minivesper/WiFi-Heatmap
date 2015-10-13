
var fs   = require( 'fs' );
var http = require( 'http' );
var utils = require( './utils.js' );
var timers = require('timers');


var options = {
    host: 'cs.coloradocollege.edu',
    port: '8900',
    path: '/./data.txt'
  };

  //defines call back from data server, builds SQL
  function callback(response)
  {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      console.log(str);
      utils.update(str);
    });
  }

  function updateData()
    {
      http.request(options, callback).end()
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
          return false;
        }
      }

  function serveDynamic( req, res )
    {
      var kvs = utils.getFormValuesFromURL( req.url );
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
                        console.log(resp_text);
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
          timers.setInterval(updateData, 1000);
          server.listen( 8080 );

        }


init();
