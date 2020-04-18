$(document).ready(function(){
    var geocoder;
    var map;
    var markers = [];
    var addresses = [];
    var spots = [];
    var customRouteName = '';
    var customRouteDesc = '';
    var infowindows = [];
    var styles = [];
    var daytime = [];
    var night = [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ];



    geocoder = new google.maps.Geocoder();
    var center = new google.maps.LatLng(25.0505034, 121.51840949999998);
    var mapOptions = {
    zoom: 12,
    center: center,
    styles: night,
    }
        map = new google.maps.Map(document.getElementById(`map${i}`), mapOptions);
    address=[1,2,3,4,5];
    for(let j=0;j<5;j++){
        geocoder.geocode( { 'address': address[j]}, function(results, status) {
            if (status == 'OK') {
              markers.push(results[0].geometry.location);
              map.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  animation: google.maps.Animation.DROP
              });
            }
          });
    }
    // }
    // map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // address=[1,2,3,4,5];
    // for(let j=0;j<5;j++){
    //     geocoder.geocode( { 'address': address[j]}, function(results, status) {
    //         if (status == 'OK') {
    //           markers.push(results[0].geometry.location);
    //           map.setCenter(results[0].geometry.location);
    //           var marker = new google.maps.Marker({
    //               map: map,
    //               position: results[0].geometry.location,
    //               animation: google.maps.Animation.DROP
    //           });
    //         }
    //       });
    // }
    // function codeAddress() {
    //     var address = $('.search').val();
    //     geocoder.geocode( { 'address': address}, function(results, status) {
    //       if (status == 'OK') {
    //         markers.push(results[0].geometry.location);
    //         map.setCenter(results[0].geometry.location);
    //         var marker = new google.maps.Marker({
    //             map: map,
    //             position: results[0].geometry.location,
    //             animation: google.maps.Animation.DROP
    //         });
    //       } else {
    //         alert('錯誤原因: ' + status + '。請聯繫客服人員，謝謝！');
    //       }
    //     });
    //   }
});