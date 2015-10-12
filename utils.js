//Util for parsing URLs and dealing with times, if we ever get around to that.
exports.getFormValuesFromURL = function( url )
{
    var kvs = {};
    var parts = url.split( "?" );
    if( parts.length === 2 )
    {
        var key_value_pairs = parts[1].split( "&" );
        for( var i = 0; i < key_value_pairs.length; i++ )
        {
            var key_value = key_value_pairs[i].split( "=" );
            kvs[ key_value[0] ] = key_value[1];
        }
    }
    return kvs
}

exports.parseTime = function (time)
{
  var time_value = 0;
  var char_pattern = /[0-9A-Za-z]{1,2}/g;
  var time_parts = time.match(char_pattern);
  var a = parseInt(time_parts[0]);
  var b = parseInt(time_parts[1]);
  time_value = (a*100) + b;
  if(time_parts[2] == "PM" && a != 12)
  {
    time_value = time_value + 1200;
  }
  if(time_parts[2] == "AM" && a == 12)
  {
    time_value = time_value + 1200;
  }
  return time_value;
}

//writes over previous database data with most recent info
exports.update = function( contents_lines )
{
  var sql = require( 'sqlite3' ).verbose();
  var db = new sql.Database( 'data.sqlite' );
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
