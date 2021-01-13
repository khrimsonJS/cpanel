(function () {
'use strict';

angular.module('MenuApp')
.controller('HomeController', HomeController);


HomeController.$inject = ['items', 'latest'];
function HomeController(items, latest) {
  	var home = this;

	  home.items = []; 
   	home.items = items;
   	home.latest = {};
   	home.latest = latest[0];
   	
   	home.giorno = home.latest.data.slice(8,10);
  	home.mese = home.latest.data.slice(5,7);
  	home.anno = home.latest.data.slice(0,4);
  	home.datatrunc = home.giorno.concat('/',home.mese,'/', home.anno);
  	
   	console.log('home.latest:', home.latest);
   	
   	var map = L.map('map').setView([42.114524, 12.586665], 5);
  	L.geoJson(home.items).addTo(map);
	
   	console.log("items[0]: ",home.items);
	//console.log("home.items[0].data): ",home.items[0].data);

	function getColor(d) {
    return d > 2000 ? '#800026' :
           d > 1000  ? '#BD0026' :
           d > 500  ? '#E31A1C' :
           d > 250  ? '#FC4E2A' :
           d > 100   ? '#FD8D3C' :
           d > 50   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
  	}

	function getColor2(d) {
	    return d > 100000 ? '#005a32' :
	           d > 50000  ? '#238b45' :
	           d > 25000  ? '#41ab5d' :
	           d > 10000  ? '#74c476' :
	           d > 5000   ? '#a1d99b' :
	           d > 2500   ? '#c7e9c0' :
	           d > 1000   ? '#e5f5e0' :
	                      '#f7fcf5';
	  }

	  function style(feature) {
	      return {
	          fillColor: getColor(feature.properties.nuovi_positivi),
	          weight: 1,
	          opacity: 1,
	          color: 'white',
	          dashArray: '1',
	          fillOpacity: 0.6
	      };
	  }

	  function style2(feature) {
	      return {
	          fillColor: getColor2(feature.properties.totale_positivi),
	          weight: 1,
	          opacity: 1,
	          color: 'white',
	          dashArray: '1',
	          fillOpacity: 0.7
	      };
	  }

	 var l1 = L.geoJson(regioniData, {style: style, onEachFeature: onEachFeature});
	 var l2 = L.geoJson(regioniData, {style: style2, onEachFeature: onEachFeature2});

	 var overlayMaps = {"Totale": l2, "Nuovi": l1 };

   

	 function highlightFeature(e) {
      	var layer = e.target;
		layer.setStyle({
          weight: 2,
          color: 'white',
          dashArray: '',
          fillOpacity: 0.1
      	});

      	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
      	}
      	info.update(layer.feature.properties);
  	}

  	function highlightFeature2(e) {
      	var layer = e.target;
      	layer.setStyle({
          weight: 2,
          color: 'white',
          dashArray: '',
          fillOpacity: 0.1
      	});

      	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
      	}
      	info2.update(layer.feature.properties);
  	}

  	function resetHighlight(e) {
	    l1.resetStyle(e.target);
	    info.update();
  	}

  	function resetHighlight2(e) {
	    l2.resetStyle(e.target);
	    info2.update();
  	}

  	function onEachFeature(feature, layer) {
      	layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight
         // click: zoomToFeature
      	});
  	}

   	function onEachFeature2(feature, layer) {
      	layer.on({
          mouseover: highlightFeature2,
          mouseout: resetHighlight2
         // click: zoomToFeature
      	});
  	}

  	var info = L.control(({ position: 'bottomleft' }));

	  info.onAdd = function (map) {
	      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	      this.update();
	      return this._div;
	  };

  
	// method that we will use to update the control based on feature properties passed
  	info.update = function (props) {
      this._div.innerHTML = '<h4>Nuovi positivi</h4>' +  (props ?
          '<b>' + props.denominazione_regione + '</b><br />' + props.nuovi_positivi + ' nuovi positivi in data ' + props.data 
          : 'Evidenzia una regione');
  	};

  	var info2 = L.control({ position: 'bottomleft' });

  	info2.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
  	};
 
	// method that we will use to update the control based on feature properties passed
  	info2.update = function (props) {
      this._div.innerHTML = '<h4>Totale positivi</h4>' +  (props ?
          '<b>' + props.denominazione_regione + '</b><br />' + props.totale_positivi + ' totale positivi in data ' + props.data 
          : 'Evidenzia una regione');
  	};

  	var nuoviLegend = L.control({position: 'bottomright'});

  	nuoviLegend.onAdd = function (map) {

    	var div = L.DomUtil.create('div', 'info legend'),
        	grades = [0, 10, 50, 100, 250, 500, 1000, 2000],
        	labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
	      	for (var i = 0; i < grades.length; i++) {
	          div.innerHTML +=
	              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
	              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
	      	}

      	return div;
  	};

  	var totaliLegend = L.control({position: 'bottomright'});

  	totaliLegend.onAdd = function (map) {

    	var div = L.DomUtil.create('div', 'info legend 2'),
        	grades = [0, 1000, 2500, 5000, 10000, 25000, 50000, 100000],
        	labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
		    for (var i = 0; i < grades.length; i++) {
		    	div.innerHTML +=
		              '<i style="background:' + getColor2(grades[i] + 1) + '"></i> ' +
		              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
		    }

      	return div;
  	};

  
  //add Default layer, its control, its legend and layer control
  // map.addControl(info2);
  // map.addControl(totaliLegend);
  // map.addLayer(l2);
  // L.control.layers(null, overlayMaps, {collapsed: false}).addTo(map);

    // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    // maxZoom: 18,
    // id: 'mapbox/light-v9',
    // tileSize: 512,
    // zoomOffset: -1,
    // accessToken: key
    // }).addTo(map);





    map.on('overlayadd', function (eventLayer) {
    if (eventLayer.name === 'Nuovi') {
        setTimeout(function(){map.removeLayer(l2)}, 10);
        info.addTo(this);
        nuoviLegend.addTo(this); 
    }

    if (eventLayer.name === 'Totale') {
        setTimeout(function(){map.removeLayer(l1)}, 10);
        info2.addTo(this);
        totaliLegend.addTo(this);
    }
	});

	map.on('overlayremove', function (eventLayer) {
	    if (eventLayer.name === 'Nuovi') {
	        this.removeControl(info);
	        this.removeControl(nuoviLegend);
    } 

	    if (eventLayer.name === 'Totale') {
	        this.removeControl(info2);
	        this.removeControl(totaliLegend);
    }
});






  

} // close controller

})();

