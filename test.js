function tagColorl1( lat )
{
  var r = Math.floor((255 * lat) / 100),
           g = Math.floor((255 * (100 - lat)) / 100),
           b = 0;
    if( lat > 100 )
    {
      return tagColor(99);
    }
    console.log("rgb(" + r + "," + g + "," + b + ")" );
    return "rgb(" + r + "," + g + "," + b + ")" ;
}

function tagColorl2( lat )
{
  var r = Math.floor((255 * lat) / 200),
           g = Math.floor((255 * (200 - lat)) / 200),
           b = 0;
    if( lat > 200 )
    {
      return tagColor(199);
    }
    console.log("rgb(" + r + "," + g + "," + b + ")" );
    return "rgb(" + r + "," + g + "," + b + ")" ;
}

var elem =  document.getElementById('el');
var elem2 =  document.getElementById('elo');
var elem3 =  document.getElementById('ello');
elem.style.color = tagColorl2( 10 );
elem2.style.color = tagColorl2( 50 );
elem3.style.color = tagColorl2( 120 );
