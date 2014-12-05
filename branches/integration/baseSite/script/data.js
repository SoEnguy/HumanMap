function initPromise(){
  var settings={
   dataType: 'json',
   url: 'script/data/ex.json'
    }
   
  var promise = $.ajax(settings);

  return promise;
}

var promise = initPromise();

function addZoneToJson(promise, xtype, xtitre, coordCentreZoneX, coordCentreZoneY, rayonZone, xinfo){
    var obj = {type:xtype,titre:xtitre,zone: {coordCentre : {x:coordCentreZoneX,y:coordCentreZoneY},rayon:rayonZone },info:xinfo}; 
    promise.done(function(data){
        data.Zone.push(obj);
        var strData = JSON.stringify(data);
        $.ajax
        ({
            type: "GET",
            dataType : 'json',
            async: false,
            url: 'script/update_json.php',
            data: { data: JSON.stringify(data) },
            success: function () {console.log("Thanks!"); },
            failure: function() {console.log("Error!");}
        });
    });
}

//exemple
//addZoneToJson(promise,31,"Epidemie","Ebola",150,150,50,"lorem front");

function addMarkerToJson(promise, xtype, xtitre, coordMarkerLat, coordMarkerLng, xpersonnes, xinfo){
    var obj = {type:xtype,titre:xtitre,coordMarker:{lat:coordMarkerLat,lng:coordMarkerLng},personnes:xpersonnes,info:xinfo}; 
    promise.done(function(data){
        data.Marker.push(obj);
        var strData = JSON.stringify(data);
        $.ajax
        ({
            type: "GET",
            dataType : 'json',
            async: false,
            url: 'script/update_json.php',
            data: { data: JSON.stringify(data) },
            success: function () {console.log("Thanks!"); },
            failure: function() {console.log("Error!");}
        });
    });
}

//exemple
//addMarkerToJson(promise,"camp","camplaba",150,150,[{name:"jean",surname:"jack"},{name:"jean",surname:"jack"}],"lorem front");

function addPersonOnMarkerToJson(promise, id, xnom, xprenom, xdateNaissance, xdateArrive){
  var obj = {nom:xnom, prenom:xprenom, dateNaissance:xdateNaissance, dateArrive:xdateArrive};
  promise.done(function(data){
        data.Marker[id].personnes.push(obj);
        var strData = JSON.stringify(data);
        $.ajax
        ({
            type: "GET",
            dataType : 'json',
            async: false,
            url: 'script/update_json.php',
            data: { data: JSON.stringify(data) },
            success: function () {console.log("Thanks!"); },
            failure: function() {console.log("Error!");}
        });
    });
}

//exemple
//addPersonOnMarkerToJson(promise, 0, "michel", "michel", "20/08/1980", "20/11/2014");

function getAllZones(promise){
  promise.done(function(data){
    $.each(data.Zone, function(index, zone){
        console.log(zone);
      });
  });
}

//getAllZones(promise);

// function getZone(promise, id){
//   var obj;
//   promise.done(function(data){
//       return data.Zone[id];
//   });
// }

// console.log(getZone(promise,0));

// function getMarker(promise, id){
//   var obj;
//   promise.done(function(data){
//        obj = data.Marker[id].type;
//   });
//   return obj;
// }

// console.log(getMarker(promise,0));
