$(document).ready(function () {
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
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }]
    }
  ];

  //   //daytime/night switch
  //   $('#map').click(function(){
  //       if(styles === daytime){
  //           styles = night;
  //       } else {
  //           styles = daytime;
  //       }
  //   });

  geocoder = new google.maps.Geocoder();
  var center = new google.maps.LatLng(25.0505034, 121.51840949999998);
  var mapOptions = {
    zoom: 12,
    center: center,
    styles: night,
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  //加入景點
  $('.addSpot').click(function (e) {
    e.preventDefault();
    codeAddress();
  });



  //規劃路線
  $('.plan').click(function (e) {
    e.preventDefault();
    var waypts = [];
    for (var i = 1; i <= markers.length - 2; i++) {
      waypts.push({
        location: markers[i],
        stopover: true
      });
    }
    directions(markers[0], markers[markers.length - 1], waypts);
  });

  //儲存路線

  $('.confirm').click(function (e) {
    //判斷自訂路線名稱和簡介填寫了沒？
    if ($('.routeName').val() != '' && $('.routeDesc').val() != '') {
      //存入使用者輸入的自訂路線名稱和簡介
      customRouteName = $('.routeName').val();
      customRouteDesc = $('.routeDesc').val();
      var routeInfo = [];
      routeInfo.push(addresses);
      let customForm = new FormData();
      customForm.append('customRouteName', customRouteName);
      customForm.append('customRouteDesc', customRouteDesc);
      customForm.append('routeInfo', routeInfo);

      // AJAX
      var xhr = new XMLHttpRequest();
      //POST
      xhr.open("POST", "./php/customRouteAdd.php", true);
      // xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.send(customForm);
      xhr.onload = function () {
        if (xhr.status == 200) {
          alert('您的路線已儲存，請到會員專區查看。謝謝!');
        } else {
          alert('似乎出了點問題哦，請重新整理!');
        }
      }
    } else {
      alert('請填寫自訂路線名稱和簡介!!!!!');
    }
  });

  const directions = (origin, dest, waypts) => {
    let directionService = new google.maps.DirectionsService(),
      directionDisplay = new google.maps.DirectionsRenderer(),
      request = {
        origin: origin,
        destination: dest,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'WALKING'
      }
    directionDisplay.setMap(map);
    directionService.route(request, (result, status) => {
      if (status == 'OK') {
        // 回傳路線上每個步驟的細節
        var steps = result.routes[0].legs[0].steps;
        steps.forEach((e, i) => {
          // 加入地圖標記
          markers[i] = new google.maps.Marker({
            position: { lat: e.start_location.lat(), lng: e.start_location.lng() },
            map: map,
            label: { text: i + '', color: "#fff" }
          });
          // 加入資訊視窗
          infowindows[i] = new google.maps.InfoWindow({
            content: e.instructions
          });
          // 加入地圖標記點擊事件
          markers[i].addListener('click', function () {
            if (infowindows[i].anchor) {
              infowindows[i].close();
            } else {
              infowindows[i].open(map, markers[i]);
            }
          });
        });
        directionDisplay.setDirections(result);
      }
    });
  }

  function codeAddress() {
    var address = $('.search').val();
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == 'OK') {
        markers.push(results[0].geometry.location);
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          animation: google.maps.Animation.DROP
        });
        //暫存景點
        addresses.push(address);
        for (var i = 0; i <= markers.length - 1; i++) {
          spots[i] = markers[i];
        }
        //清除地點
        $('.removeSpot').click(function (e) {
          e.preventDefault();
          marker.setMap(null);
          markers = [];
          spots = [];
        });
      } else {
        alert('錯誤原因: ' + status + '。請聯繫客服人員，謝謝！');
      }
    });
  }
});