function initialize() {
		var map;
      	//MAP OPTIONS
        var mapOptions = {
			maxZoom: 12,
			minZoom: 4,
			zoom: 4,
			keyboardShorcuts: true,
			panControl: true,
			scrollwheel: true,
			streetViewControl: false,
			mapTypeId: "roadmap"
        };
		
		// GEOLOCALISATION
		  if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
				
				  var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				  
				  var infowindow = new google.maps.InfoWindow({
					map: map,
					position: pos//,
				  });
				  
				  var marker = new google.maps.Marker({
					  position: pos,
					  map: map,
					  title: 'Your current position'
				  });	

				google.maps.event.addListener(map, 'zoom_changed', function(event){
					var zoomActu = map.getZoom();
					if (zoomActu >= 6) {
						$('#content').show(200);
					} else if (zoomActu < 6) {
						$('#content').hide(200);
					}
				});	
				  	
				  map.setCenter(pos);
				}, function() {
				  handleNoGeolocation(true);
				});
		  } else {
			// Browser doesn't support Geolocation
			handleNoGeolocation(false);
		  }
		  
		  function handleNoGeolocation(errorFlag) {
			  if (errorFlag) {
				var content = 'Error: The Geolocation service failed.';
			  } else {
				var content = 'Error: Your browser doesn\'t support geolocation.';
			  }

			  var options = {
				map: map,
				position: new google.maps.LatLng(60, 105),
				content: content
			  };

			  var infowindow = new google.maps.InfoWindow(options);
			  map.setCenter(options.position);
			}

        //POSITION AFRIQUE
        var myLatlngAf = new google.maps.LatLng(5.233345, 30.463906);
        //POSITION EUROPE
        var myLatlngEu = new google.maps.LatLng(52.504540, 11.781136);
        //POSITION AMERIQUE
        var myLatlngAm = new google.maps.LatLng(20.921674, -80.999700);
        //POSITION ASIE
        var myLatlngAs = new google.maps.LatLng(36.939557, 90.349243);
        //POSITION OCEANIE
        var myLatlngOc = new google.maps.LatLng(-24.440290, 144.465183);
        
        //LOAD MAP
         map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

         //Application des styles à la map
         var styles = [
			{
			    featureType: "all",
			    stylers: [
				{ lightness: -20 },
			    ]
			},
			{
			    featureType: "road",
			    elementType: "geometry",
			    stylers: [
				{ visibility: "simplified" }
			    ]
			},
			{
			    featureType: "administrative",
			    stylers: [
				{ visibility: "simplified" }
			    ]
			},
			
			{
			    featureType: "poi",
			    stylers: [
				{ visibility: "off" }
			    ]
			},
			{
			    featureType: "poi.medical",
			    stylers: [
				{ visibility: "on" }
			    ]
			},

			{
			    featureType: "road",
			    elementType: "labels",
			    stylers: [
				{visibility: "off"}
				  ]
			}
		    ];		  		  
		    map.setOptions({styles: styles});
		 
		 //POSITION ACTUELLE ONCLICK
		 $('#current').click(function(){
			map.setCenter(pos);
		 });
        
        //ZOOM AFRIQUE ONCLICK
        $('#afrique').click(function(){
        	map.setZoom(4);
			map.setCenter(myLatlngAf);
        }).fadeIn(200);
        
        //ZOOM EUROPE ONCLICK
        $('#europe').click(function(){
        	map.setZoom(4);
			map.setCenter(myLatlngEu);
        }).fadeIn(200);
        
        //ZOOM AMERIQUE ONCLICK
        $('#amerique').click(function(){
        	map.setZoom(3.5);
			map.setCenter(myLatlngAm);
        }).fadeIn(200);
        
        //ZOOM ASIE ONCLICK
        $('#asie').click(function(){
        	map.setZoom(4);
			map.setCenter(myLatlngAs);
        }).fadeIn(200);
        
        //ZOOM OCEANIE ONCLICK
        $('#oceanie').click(function(){
        	map.setZoom(4);
			map.setCenter(myLatlngOc);
        }).fadeIn(200);

        genMarkers(map);
        genZone(map);
           		
   	}

   	function genMarkers(map){
   		var promise = initPromise();

   		promise.done(function(data){
   			$.each(data.Marker, function(index, element){
   				drawMarker(map, element.type, element.coordMarker.lat, element.coordMarker.lng, element.info);
   			});
   		});
   	}

   	function genZone(map){
   		var promise = initPromise();

   		promise.done(function(data){
   			$.each(data.Zone, function(index, element){
   				drawZone(map, element.type, element.zone.coordCentre.lat, element.zone.coordCentre.lng, element.zone.rayon ,element.info);
   			});
   		});
   	}

   	function drawZone(map,type,lat,lng,radius,info){
    latLng = new google.maps.LatLng(lat,lng);
    
    if(type == "epidemie"){
	   color = '#FFFF00';
    }
    if(type == "conflit"){
	   color = '#FF0000';
    }

    var zone = {
    	strokeColor: color,
    	strokeOpacity: 0.8,
    	strokeWeight: 2,
    	fillColor: color,
    	fillOpacity: 0.35,
    	map: map,
    	center: latLng,
    	radius: radius
    };

	$("#content").html(info);

    var infowindow = new google.maps.InfoWindow({
	   content: info
    });

    var circle = new google.maps.Circle(zone);
    google.maps.event.addListener(circle, 'click', function() {
    	zoomZone(map, circle);
    });
        
}

   	function drawMarker(map, type, lat, lng, info){
	    latLng = new google.maps.LatLng(lat,lng);
	    var icon = new google.maps.MarkerImage(
			"./image/"+type+".png",
			null, /* size is determined at runtime */
			null, /* origin is 0,0 */
			null, /* anchor is bottom center of the scaled image */
			new google.maps.Size(40, 40)
	    ); 
		
	    var mark = new google.maps.Marker({
			position: latLng,
			map: map,
			icon : icon
	    });
	    
		$("#content").html(info);

	    google.maps.event.addListener(mark, 'click', function() {
			zoomMarker(map, mark);
	    });
	}

   	//Fonction d'haversine permettant le calcul de distance
	var rad = function(x) {
	  return x * Math.PI / 180;
	};
	
   	var getDistance = function(p1, p2) {
	  	var R = 6378137, // Earth’s mean radius in meter
	  		dLat = rad(p2.lat() - p1.lat()),
	  		dLong = rad(p2.lng() - p1.lng()),
	  		a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong / 2) * Math.sin(dLong / 2),
	  		c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
	  		d = R * c;
	  return d; // returns the distance in meter
	};

	//google.maps.event.addDomListener(window, 'load', initialize);
	
	function loadScript() {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
		  'callback=initialize';
		document.body.appendChild(script);
	}

	//ZOOM ON MARKER
	function zoomMarker(map, marker){
		map.panTo(marker.getPosition());
		smoothZoom(map, 7, map.getZoom());	

		google.maps.event.addListener(map, 'idle', function(event){
			if (getDistance(map.getCenter(), marker.getPosition())>15000) {
				$("#content").hide();
			}
		});
	}

	function zoomZone(map, zone){
		map.panTo(zone.getCenter());
		smoothZoom(map, 7, map.getZoom());	

		google.maps.event.addListener(map, 'idle', function(event){
			if (getDistance(map.getCenter(), zone.getCenter())>15000) {
				$("#content").hide();
			}
		});
	}

	//FUNCTION ZOOM MARKER
	function smoothZoom (map, max, cnt) {
		if (cnt >= max) {
			return;
		}
		else {
			var z = google.maps.event.addListener(map, 'zoom_changed', function(event){
			google.maps.event.removeListener(z);
			smoothZoom(map, max, cnt + 1);
			$('#content').show(200);
		});
		if (map.getZoom() == cnt ) {
			$('#content').show(200);
		} else {
			$('#content').hide();	
		}
		setTimeout(function(){map.setZoom(cnt)}, 100); 
		}
	}

	window.onload = loadScript;
