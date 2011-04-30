var Demo = {
  map: null,
  infoWindow: null
};
  
/**
 * Called when clicking anywhere on the map and closes the info window.
 */
Demo.closeInfoWindow = function() {
  Demo.infoWindow.close();
};
 
/**
 * Called only once on initial page load to initialize the map.
 */
Demo.init = function() {
  // Create single instance of a Google Map.   34.82013166842222, 113.5337557595825
  var centerLatLng = new google.maps.LatLng(34.82013166842222, 113.5337557595825);
  Demo.map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 13,
    center: centerLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  
  // Create a single instance of the InfoWindow object which will be shared
  // by all Map objects to display information to the user.
  Demo.infoWindow = new google.maps.InfoWindow();
  
  // Make the info window close when clicking anywhere on the map.
  google.maps.event.addListener(Demo.map, 'click', Demo.closeInfoWindow);
  
  // Add multiple markers in a few random locations around San Francisco.
  // First random marker
  var locationMarker = new google.maps.Marker({
    position: centerLatLng, 
    map: Demo.map,
    title:"郑州大学菊园1号楼"
  });
  var dragMarker = new google.maps.Marker({
    position: new google.maps.LatLng(34.82114436119465, 113.52747402606963), 
    map: Demo.map,
    title:"Drage Me!",
    draggable:true
  });
  Demo.openDragInfoWindow=function(dragMarker) {
    var markerLatLng = dragMarker.getPosition();
    Demo.infoWindow.setContent(['<b>Marker position is:</b><br/>',markerLatLng.lat(),', ',markerLatLng.lng()].join(''));
    Demo.infoWindow.open(Demo.map, dragMarker);
  },
  Demo.openLocationInfoWindow=function(locationMarker){
    Demo.infoWindow.setContent(['<b>郑州大学菊园1号楼</b><br>','<img width="177.5" height="336.5" src="/images/me.png"/>'].join(''));
    Demo.infoWindow.open(Demo.map,locationMarker);
  }
  // Register event listeners to each marker to open a info window 
  google.maps.event.addListener(dragMarker, 'click', function(){
  Demo.openDragInfoWindow(dragMarker);
  });
  google.maps.event.addListener(locationMarker,'click',function(){
  Demo.openLocationInfoWindow(locationMarker);
  });
}
Demo.init();

