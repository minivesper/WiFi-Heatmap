//Places data from text file into SQL database;
var fs = require( 'fs' );

if( process.argv.length < 3)
{
  console.log("Usage: Need a filename");
  process.exit( 1 );
}
var filename = process.argv[ 2 ];
console.log("You want me to read file: " + filename );
try{
  var fileBuffer = fs.readFileSync( filename );
}
catch( exp ) {
  console.log("Failed to read file: " + filename);
  process.exit( 2 );
}

function write()
{
  var sql = require( 'sqlite3' ).verbose();
  var db = new sql.Database( 'data.sqlite' );
  var contents = fileBuffer.toString();
  var contents_lines = contents.split('\n');
  for (var i = 0; i < contents_lines.length; i++) {
    if(contents_lines[i] !== "")
      {
        var line = [];
        line = contents_lines[i].split(",");
        l1 = line[1];
        l2 = line[2];
        //console.log(sql + values);
        db.run( "INSERT INTO Nodes(L1, L2) VALUES ( ?, ? )", l1, l2,
                    function( err ) {
                        //console.log(err);
                        console.log("added latency data");
                    } );
      }

   }
}


function update()
{
  var sql = require( 'sqlite3' ).verbose();
  var db = new sql.Database( 'data.sqlite' );
  var contents = fileBuffer.toString();
  var contents_lines = contents.split('\n');
  for (var i = 0; i < contents_lines.length; i++) {
    if(contents_lines[i] !== "")
      {
        var line = [];
        line = contents_lines[i].split(",");
        var sql = "UPDATE Nodes Set L1='" + line[1] + "', L2='" + line[2] + "' WHERE ID='" + i + "'" ;
        db.run( sql,
                    function( err ) {
                        //console.log(err);
                        console.log("Updated latency data");
                    } );
      }

   }
}
write();
