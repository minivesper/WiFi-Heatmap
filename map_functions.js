// a function to set each building's data
function onEachFeature(feature, layer) {
    
    for(var i = 0; i < building_data.length; i++)
    {
        var current = building_data[i];
        if (current.ID === parseInt(feature.id)) {
            feature.properties.L1 = current.Lat1;
            feature.properties.L2 = current.Lat2;
            feature.properties.color = "grey";

            var popup_content = "<p>Local Ping: " + feature.properties.l1 + "\n" + "Exterior Ping: " + feature.properties.l2 + "</p>";
            layer.bindPopup(popup_content);
        }
    }
}

function fillMap() {
    // call the function to add network information and corresponding interactivity
    L.geoJson(buildings, {
        onEachFeature: onEachFeature
    }).addTo(map);
}

function colorMap() {
    // color the buildings based on their network grade
    colorLayer = L.geoJson(buildings, {
        style: function(feature) {
            return {color: feature.properties.color}
        }
    });
    colorLayer.addTo(map);
}

function tagColorl1(feature)
{
    var lat = feature.properties.L1;
  var r = Math.floor((255 * lat) / 100),
           g = Math.floor((255 * (100 - lat)) / 100),
           b = 0;
    if( lat > 100 )
    {
     r = Math.floor((255 * 99) / 200),
           g = Math.floor((255 * (200 - 99)) / 200),
           b = 0;
           feature.properties.color =  "rgb(" + r + "," + g + "," + b + ")" ;
           return;
    }
    console.log(feature.id);
    console.log("rgb(" + r + "," + g + "," + b + ")");
    feature.properties.color = "rgb(" + r + "," + g + "," + b + ")" ;
}

function tagColorl2(feature)
{
    var lat = feature.properties.L2;
  var r = Math.floor((255 * lat) / 200),
           g = Math.floor((255 * (200 - lat)) / 200),
           b = 0;
    if( lat > 200 )
    {
      r = Math.floor((255 * 199) / 200),
           g = Math.floor((255 * (200 - 199)) / 200),
           b = 0;
           feature.properties.color =  "rgb(" + r + "," + g + "," + b + ")" ;
           return;
    }
    feature.properties.color =  "rgb(" + r + "," + g + "," + b + ")" ;
}

function colorL1() {
    for (var i = 0; i < 20; i++) {
        var current = buildings.features[i];
        tagColorl1(current);
    }
    map.removeLayer(colorLayer);
    colorMap();
}

function colorL2() {
    for (var i = 0; i < 20; i++) {
        var current = buildings.features[i];
        tagColorl2(current);
    }
    map.removeLayer(colorLayer);
    colorMap();
}