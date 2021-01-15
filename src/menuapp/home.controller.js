(function () {
'use strict';

angular.module('MenuApp')
.controller('HomeController', HomeController);

HomeController.$inject = ['items','latest', 'tk'];
function HomeController(items, latest, tk) {
    var home = this;

    home.items = []; 
    home.items = items;
    home.latest = {};
    home.latest = latest[0];
    home.tk = tk;
    
    home.giorno = home.latest.data.slice(8,10);
    home.mese = home.latest.data.slice(5,7);
    home.anno = home.latest.data.slice(0,4);
    home.datatrunc = home.giorno.concat('/',home.mese,'/', home.anno);
    home.latest.popolaz = 59641488;

    // home.latest.incidenza = (home.latest.nuovi_positivi*100/59641488).toPrecision(3);
    // home.latest.prevalenza = (home.latest.totale_positivi*100/59641488).toPrecision(3);
    //console.log("items.properties.incidenza[0]: ",regioniData.properties.features[0]);
     //console.log("items.properties.incidenza[0]: ",regioniData.features[0]);
    //console.log('home.latest:', home.latest);
    
    //console.log("items[0]: ",home.items);
    //console.log("home.items[0].data): ",home.items[0].data);

  function getColor(d) {
    return d > 2000  ? '#800026' :
           d > 1000  ? '#BD0026' :
           d > 500   ? '#E31A1C' :
           d > 250   ? '#FC4E2A' :
           d > 100   ? '#FD8D3C' :
           d > 50    ? '#FEB24C' :
           d > 10    ? '#FED976' :
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

    function getColor3(d) {
      return d > 0.05       ? '#7a0177' :
             d > 0.025      ? '#ae017e' :
             d > 0.01       ? '#dd3497' :
             d > 0.005      ? '#f768a1' :
             d > 0.0025     ? '##fa9fb5' :
             d > 0.001      ? '##fcc5c0' :
             d > 0.0005     ? '##fde0dd' :
                              '##fff7f3';
    }

    function getColor4(d) {
      return d > 1        ? '#4a1486' :
             d > 0.5      ? '#6a51a3' :
             d > 0.25     ? '#807dba' :
             d > 0.1      ? '#9e9ac8' :
             d > 0.05     ? '#bcbddc' :
             d > 0.025    ? '#dadaeb' :
             d > 0.01     ? '#efedf5' :
                            '#fcfbfd';
    }

    function style(feature) {
        return {
            fillColor: getColor(feature.properties.nuovi_positivi),
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '1',
            fillOpacity: 0.7
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

    function style3(feature) {
        return {
            fillColor: getColor3(feature.properties.incidenza),
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '1',
            fillOpacity: 0.7
        };
    }

    function style4(feature) {
        return {
            fillColor: getColor4(feature.properties.prevalenza),
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '1',
            fillOpacity: 0.7
        };
    }

   var l1 = L.geoJson(regioniData, {style: style, onEachFeature: onEachFeature});
   var l2 = L.geoJson(regioniData, {style: style2, onEachFeature: onEachFeature2});
   var l3 = L.geoJson(regioniData, {style: style3, onEachFeature: onEachFeature3});
   var l4 = L.geoJson(regioniData, {style: style4, onEachFeature: onEachFeature4});

   var overlayMaps = { "Totale Positivi": l2, "Nuovi Positivi": l1, "Prevalenza": l4, "Incidenza": l3 };

   

   function highlightFeature(e) {
        var layer = e.target;
        layer.setStyle({
              weight: 2,
              color: 'white',
              dashArray: '',
              fillOpacity: 0.1
            });

        // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        //   layer.bringToFront();
        // }
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

        // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        //   layer.bringToFront();
        // }
        info2.update(layer.feature.properties);
    }

    function highlightFeature3(e) {
        var layer = e.target;
        layer.setStyle({
              weight: 2,
              color: 'white',
              dashArray: '',
              fillOpacity: 0.1
            });

        // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        //   layer.bringToFront();
        // }
        info3.update(layer.feature.properties);
    }

    function highlightFeature4(e) {
        var layer = e.target;
        layer.setStyle({
          weight: 2,
          color: 'white',
          dashArray: '',
          fillOpacity: 0.1
        });

        // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        //   layer.bringToFront();
        // }
        info4.update(layer.feature.properties);
    }

    function resetHighlight(e) {
      l1.resetStyle(e.target);
      info.update();
    }

    function resetHighlight2(e) {
      l2.resetStyle(e.target);
      info2.update();
    }

    function resetHighlight3(e) {
      l3.resetStyle(e.target);
      info3.update();
    }

    function resetHighlight4(e) {
      l4.resetStyle(e.target);
      info4.update();
    }

    function onEachFeature(feature, layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight
        });
    }

    function onEachFeature2(feature, layer) {
        layer.on({
          mouseover: highlightFeature2,
          mouseout: resetHighlight2
        });
    }

    function onEachFeature3(feature, layer) {
        layer.on({
          mouseover: highlightFeature3,
          mouseout: resetHighlight3
        });
    }

    function onEachFeature4(feature, layer) {
        layer.on({
          mouseover: highlightFeature4,
          mouseout: resetHighlight4
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

    var info3 = L.control({ position: 'bottomleft' });

    info3.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

  
  // method that we will use to update the control based on feature properties passed
    info3.update = function (props) {
      this._div.innerHTML = '<h4>Incidenza</h4>' +  (props ?
          '<b>' + props.denominazione_regione + '</b><br />' + props.incidenza + ' Incidenza in data ' + props.data 
          : 'Evidenzia una regione');
    };

    var info4 = L.control({ position: 'bottomleft' });

    info4.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };
 
  // method that we will use to update the control based on feature properties passed
    info4.update = function (props) {
      this._div.innerHTML = '<h4>Prevalenza</h4>' +  (props ?
          '<b>' + props.denominazione_regione + '</b><br />' + props.prevalenza + ' Prevalenza in data ' + props.data 
          : 'Evidenzia una regione');
    };


    //legends
    var nuoviLegend = L.control({position: 'bottomright'});

    nuoviLegend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10, 50, 100, 250, 500, 1000, 2000],
          labels = [];

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

        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
                  '<i style="background:' + getColor2(grades[i] + 1) + '"></i> ' +
                  grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    var incidenzaLegend = L.control({position: 'bottomright'});

    incidenzaLegend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend 3'),
          grades = [0, 0.0005, 0.001, 0.0025, 0.005, 0.01, 0.025, 0.05],
          labels = [];

          div.innerHTML = '<i style="background:##fff7f3"></i> 0–0.0005<br><i style="background:#fde0dd"></i> 0.0005–0.001<br><i style="background:#fcc5c0"></i> 0.001–0.0025<br><i style="background:#fa9fb5"></i> 0.0025–0.005<br><i style="background:#f768a1"></i> 0.005–0.01<br><i style="background:#dd3497"></i> 0.01–0.025<br><i style="background:#ae017e"></i> 0.025–0.05<br><i style="background:#7a0177"></i> 0.05+'
        
        // for (var i = 0; i < grades.length; i++) {
        //   div.innerHTML +=
        //           '<i style="background:' + getColor3(grades[i] + 1) + '"></i> ' +
        //           grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        // }

        return div;
    };

    var prevalenzaLegend = L.control({position: 'bottomright'});

    prevalenzaLegend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend 4'),
          grades = [0, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1],
          labels = ['<strong>Prevalenza</strong>'];

        // for (var i = 0; i < grades.length; i++) {
        //   div.innerHTML +=
        //           '<i style="background:' + getColor4(grades[i] + 1) + '"></i> ' +
        //           grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        // }
        div.innerHTML = '<i style="background:#fcfbfd"></i> 0–0.01<br><i style="background:#efedf5"></i> 0.01–0.025<br><i style="background:#dadaeb"></i> 0.025–0.05<br><i style="background:#bcbddc"></i> 0.05–0.1<br><i style="background:#9e9ac8"></i> 0.1–0.25<br><i style="background:#807dba"></i> 0.25–0.5<br><i style="background:#6a51a3"></i> 0.5–1<br><i style="background:#4a1486"></i> 1+'
        return div;
    };
  
  //inizialize map
  var map = L.map('map').setView([42.114524, 13.5], 5);
  //L.geoJson(home.items).addTo(map);




  //add Default layer, its control, its legend and layer control
    map.addControl(info2);
    map.addControl(totaliLegend);
    map.addLayer(l2);
    L.control.layers(null, overlayMaps, {collapsed: false}).addTo(map);

 

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://github.com/pcm-dpc">PCM - Dip. Protezione Civile</a> - Imagery ©  <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: home.tk
    }).addTo(map);





    map.on('overlayadd', function (eventLayer) {
    if (eventLayer.name === 'Nuovi Positivi') {
        setTimeout(function(){map.removeLayer(l2)}, 10);
        setTimeout(function(){map.removeLayer(l3)}, 20);
        setTimeout(function(){map.removeLayer(l4)}, 30);
        info.addTo(this);
        nuoviLegend.addTo(this); 
    }

    if (eventLayer.name === 'Totale Positivi') {
        setTimeout(function(){map.removeLayer(l1)}, 10);
        setTimeout(function(){map.removeLayer(l3)}, 20);
        setTimeout(function(){map.removeLayer(l4)}, 30);
        info2.addTo(this);
        totaliLegend.addTo(this);
    }

    if (eventLayer.name === 'Incidenza') {
        setTimeout(function(){map.removeLayer(l1)}, 10);
        setTimeout(function(){map.removeLayer(l2)}, 20);
        setTimeout(function(){map.removeLayer(l4)}, 30);
        info3.addTo(this);
        incidenzaLegend.addTo(this);
    }

    if (eventLayer.name === 'Prevalenza') {
        setTimeout(function(){map.removeLayer(l1)}, 10);
        setTimeout(function(){map.removeLayer(l2)}, 20);
        setTimeout(function(){map.removeLayer(l3)}, 30);
        info4.addTo(this);
        prevalenzaLegend.addTo(this);
    }
  });

  map.on('overlayremove', function (eventLayer) {
      if (eventLayer.name === 'Nuovi Positivi') {
          this.removeControl(info);
          this.removeControl(nuoviLegend);
    } 

      if (eventLayer.name === 'Totale Positivi') {
          this.removeControl(info2);
          this.removeControl(totaliLegend);
    }

     if (eventLayer.name === 'Incidenza') {
          this.removeControl(info3);
          this.removeControl(incidenzaLegend);
    }

    if (eventLayer.name === 'Prevalenza') {
          this.removeControl(info4);
          this.removeControl(prevalenzaLegend);
    }
});

  
} // close controller

})();

