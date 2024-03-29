// Store locator with customisations
// - custom marker

google.maps.event.addDomListener(window, 'load', function() {
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(30.3165, 78.0322), //-28,135
    zoom:4,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var panelDiv = document.getElementById('panel');

  var data = new StoreDataSource;

  var view = new storeLocator.View(map, data, {
    geolocation: false,
    features: data.getFeatures()
  });

  view.createMarker = function(store) {
    var markerOptions = {
      position: store.getLocation(),
      title: store.getDetails().title
    };
    return new google.maps.Marker(markerOptions);
  }  
  new storeLocator.Panel(panelDiv, {
    view: view
  });
});


