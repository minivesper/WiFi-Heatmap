var building_data = [];
var colorLayer;

// get the data from server to classify buildings
function refresh( incoming )
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

refresh();

// create a map in the "map" div, set the view to Colorado College
var map = L.map('map').setView([38.8486555, -104.824], 17);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18,
    minZoom: 16
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