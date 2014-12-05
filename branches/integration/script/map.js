function initMapOpt(map){
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
}

function drawZone(map,type,lat,lng,radius,info){
    latLng = new google.maps.LatLng(lat,lng);
    if(type == "epidemie"){
	color = '#FFFF00'
    }
    if(type == "conflict"){
	color = '#FF0000'
    }
    var conflictZone = {
	strokeColor: color,
	strokeOpacity: 0.8,
	strokeWeight: 2,
	fillColor: color,
	fillOpacity: 0.35,
	map: map,
	center: latLng,
	radius: radius
    };
    var infowindow = new google.maps.InfoWindow({
	content: info
    });
    conflictCircle = new google.maps.Circle(conflictZone);
    google.maps.event.addListener(conflictCircle, 'click', function() {
	infowindow.open(map);
	infowindow.setPosition(latLng);
    });
}



function drawMarke(map,type,lat,lng,info){
    latLng = new google.maps.LatLng(lat,lng);
    var icon = new google.maps.MarkerImage(
	"png/"+type+".png",
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
    var infowindow = new google.maps.InfoWindow({
	content: info
    });
    google.maps.event.addListener(mark, 'click', function() {
	infowindow.open(map);
	infowindow.setPosition(latLng);
    });
}




function initialize() {
      	//FIRST MAP
        var mapOptions = {
          center: { lat: 0, lng: 0},
          zoom: 3
        };
        
        //POSITION AFRIQUE
        var myLatlngAf = new google.maps.LatLng(5.233345, 30.463906);
        //POSITION EUROPE
        var myLatlngEu = new google.maps.LatLng(52.504540, 11.781136);
        //POSITION AMERIQUE
        var myLatlngAm = new google.maps.LatLng(29.247635, -98.678017);
        //POSITION ASIE
        var myLatlngAs = new google.maps.LatLng(36.939557, 90.349243);
        //POSITION OCEANIE
        var myLatlngOc = new google.maps.LatLng(-24.440290, 144.465183);
        
        //LOAD MAP
        var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
        initMapOpt(map);
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
        $('#europe').click(function(){
        	map.setZoom(4);
			map.setCenter(myLatlngAm);
        }).fadeIn(200);
        
        //ZOOM ASIE ONCLICK
        $('#europe').click(function(){
        	map.setZoom(4);
			map.setCenter(myLatlngAs);
        }).fadeIn(200);
        
        //ZOOM OCEANIE ONCLICK
        $('#europe').click(function(){
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
            	$('#fenetre').show(200);
        	});
        	
        	if (map.getZoom() == cnt ) {
        		$('#fenetre').show(200);
        	} else {
        		$('#fenetre').hide();	
        	}
        	//console.log(cnt);
        	
        		
        	setTimeout(function(){map.setZoom(cnt)}, 100); 
    		}
		}
		
    }
     
	google.maps.event.addDomListener(window, 'load', initialize);
