var building_data = [];

// a function to set each building's data
function onEachFeature(feature, layer) {
    
    for(var i = 0; i < building_data.length; i++)
    {
        var current = building_data[i];
        if (current.ID === parseInt(feature.ID)) {
            feature.properties.L1 = current.Lat1;
            feature.properties.L2 = current.Lat2;
            var tag = tagLogic(feature.properties, feature.properties.L2);
            feature.tag = tag;
            
            var popup_content = "<p>Local Ping: " + feature.properties.l1 + "\n" + "Exterior Ping: " + feature.properties.l2 + "</p>";
            layer.bindPopup(popup_content);
        }
    }
}

function changeTag(lat) {
    for (var i = 0; i < buildings.length; i++) {
        var current = buildings[i];
        var tag = tagLogic(current.properties, current.properties.L1);
    }
}

function fillMap() {
    // call the function to add network information and corresponding interactivity
    L.geoJson(buildings, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("test");
        }
    }).addTo(map);
}

function colorMap() {
    // color the buildings based on their network grade
    L.geoJson(buildings, {
        style: function(feature) {
            switch (feature.properties.tag) {
                case 'strong': return {color: "green"};
                case 'middle': return {color: "yellow"};
                case 'weak': return {color: "red"};
            }
        }
    }).addTo(map);
}

function tagLogic(feature, lat) {

    if (lat <= 90) {
        feature.tag = 'strong';
    }
    else if (lat <= 170) {
        feature.tag = 'middle';
    }
    else {
        feature.tag = 'weak';
    }
}

// get the data from server to classify buildings
function refresh( up_not_down )
{
    var xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", onResponse );
    xhr.open( "get", "refresh?", true );
    xhr.send();
}

function onResponse( evt )
{
    building_data = JSON.parse(evt.target.responseText);
    fillMap();
    colorMap();
}

function colorSwitch() {
    console.log("here");
    changeTag();
    colorMap();
}

refresh();

// create a map in the "map" div, set the view to Colorado College
var map = L.map('map').setView([38.8486555, -104.824], 17);

// add an OpenStreetMap tile layer
L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
}).addTo(map);

// restrict the map view to campus
map.fitBounds([
    [38.851383, -104.828510],
    [38.845088, -104.827963],
    [38.844802, -104.819116],
    [38.850753, -104.818858]
]);

map.setMaxBounds([
    [38.851383, -104.828510],
    [38.845088, -104.827963],
    [38.844802, -104.819116],
    [38.850753, -104.818858]
]);

/*
    Remove previous color layer
    Separate functions and buttons local and exterior servers
    10 more buildings
    Fucking popups
*/