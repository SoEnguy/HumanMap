function initialize() {

		var map;

      	//FIRST MAP
        var mapOptions = {
			maxZoom: 12,
			minZoom: 4,
			zoom: 4,
			keyboardShorcuts: true,
			panControl: true,
			scrollwheel: true,
			streetViewControl: false,
			mapTypeId: "hybrid"
        };
		
		// GEOLOCALISATION
		  if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
				  pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				 // var pos = new google.maps.LatLng(50, 50);

				  var infowindow = new google.maps.InfoWindow({
					map: map,
					position: pos//,
					//content: '{'+position.coords.latitude+','+position.coords.longitude+'}'
				  });
				  
				  var marker = new google.maps.Marker({
					  position: pos,
					  map: map,
					  title: 'Your current position'
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
           
        //POSITION MARKER
        var myLatlng = new google.maps.LatLng(52.504540, 11.781136);
        
        //CREATE MARKER
     	var marker = new google.maps.Marker({
    		position: myLatlng,
    		map: map,
		});
		
		//ZOOM ON MARKER
		 google.maps.event.addListener(marker, 'click', function() {
    		map.panTo(marker.getPosition());
    		smoothZoom(map, 7, map.getZoom());	
  		});
  		
  		//FUNCTION ZOOM MARKER
  		function smoothZoom (map, max, cnt) {
    		if (cnt >= max) {
            	return;
        	}
    		else {
        		z = google.maps.event.addListener(map, 'zoom_changed', function(event){
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
		

		
    }
    



	google.maps.event.addDomListener(window, 'load', initialize);