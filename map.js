var building_data = [];

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


function tagLogic(feature) {
    if (feature.l1 <= 5) {
        feature.tag = 'strong';
    }
    else if (feature.l1 <= 10) {
        feature.tag = 'middle';
    }
    else {
        feature.tag = 'weak';
    }
}

//var building_data = {worner: {l1: 5, l2: 15}};

// a function to set each building's data
function onEach(feature, layer) {
    var dict = building_data[feature.properties.id];
    feature.properties.l1 = dict.l1;
    feature.properties.l2 = dict.l2;
    var tag = tagLogic(feature.properties);
    feature.tag = tag;

    var popup_content = "<p>Local Ping: " + feature.properties.l1 + "\n" + "Exterior Ping: " + feature.properties.l2 + "</p>";
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent + popup_content);
    }   
}

// call the function to add network information and corresponding interactivity
L.geoJson(buildings, {
    onEachFeature: onEach,
}).addTo(map);


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