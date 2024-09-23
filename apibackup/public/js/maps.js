
function initMap() {

let marker;

var myMapEdit = document.getElementById('myMapEdit');
var latitude = document.getElementById('lat')
var longitude = document.getElementById('long')
let myLatlng = new google.maps.LatLng(parseFloat(latitude.value), parseFloat(longitude.value));
let map = new google.maps.Map(myMapEdit, {
    center: myLatlng,
    zoom: 15,
    disableDoubleClickZoom: true
});
marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: myLatlng,
    map: map
});
var inputCopy = document.getElementById('search')
var input = document.getElementById('search')

google.maps.event.addListener(map, 'dblclick', function (event) {
    marker.setMap(null);
    var clickCoordinates = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
    var request = {
        location: clickCoordinates,
        radius: 50
    };
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            map.setCenter(clickCoordinates);
            map.setZoom(17);
            latitude.value = event.latLng.lat();
            longitude.value = event.latLng.lng();
            inputCopy.value = results[0].name
        }

    });
    marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        title: event.latLng.lat() + ', ' + event.latLng.lng()
    });
});

autocomplete = new google.maps.places.Autocomplete(input);
autocomplete.bindTo('bounds', map);
autocomplete.setFields(
    ['address_components', 'geometry', 'icon', 'name']);
autocomplete.addListener('place_changed', function () {
    marker.setMap(null);
    marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        anchorPoint: new google.maps.Point(0, -29)
    });
    var place = autocomplete.getPlace();
    if (!place.geometry) {
        window.alert("No existen detalles para: '" + place.name + "'");
        return;
    }
    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
    }
    marker.setPosition(place.geometry.location);
    latitude.value = place.geometry.location.lat();
    longitude.value = place.geometry.location.lng();
    marker.setMap(map);

});

}


