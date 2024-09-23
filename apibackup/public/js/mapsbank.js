
let nearBanksMap = document.getElementById('nearBanksMap');
let circle, myLatlng, lat, lng, mapMarkers = [];
if (nearBanksMap) {
  if (navigator.geolocation) {
    let bankName = document.getElementById('bank_name').value;
    nearBanksMap = new google.maps.Map(nearBanksMap, {
      center: new google.maps.LatLng(parseFloat(-12.0459985), parseFloat(-77.0327345)),
      zoom: 13,
    });
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude
      lng = position.coords.longitude
      myLatlng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
      nearBanksMap.setCenter(myLatlng)
      let request = {
        location: myLatlng,
        keyword: bankName,
        type: 'bank',
        radius: 3500
      };
      let service = new google.maps.places.PlacesService(nearBanksMap);
      service.nearbySearch(request, function (results, status, next) {
        new google.maps.Circle({
          strokeColor: '#FF5E3A',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF5E3A',
          fillOpacity: 0.35,
          map: nearBanksMap,
          center: myLatlng,
          radius: 5000
        });
        let infowindow;
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          results.map((result) => {
            let nearMarker = new google.maps.Marker({
              position: result.geometry.location,
              draggable: false,
              title: "Mi ubicación actual",
            });
            nearMarker.setMap(nearBanksMap);

            infowindow = new google.maps.InfoWindow({
              content: `<div>${result.name}</div>`,
              maxWidth: '100vw',
            });
            google.maps.event.addListener(nearMarker, 'click', function () {
              infowindow.open(nearBanksMap, this);
            });
          });
        } else {
          alert("Ha ocurrido un error al obtener los bancos cercanos.")
        }
      });
    }, function () {
      handleLocationError(true, infoWindow, mapAddress.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, mapAddress.getCenter());
    alert("Para ver los bancos más cercanos debe conceder el permiso de ubicación.")
  }
}