

var xmlhttp = new XMLHttpRequest();
var url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json";

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    myFunction(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {

  for (i=0;i<arr.length;i++) {
    for (i=0;i<regioniData.features.length;i++) {
      if (parseInt(arr[i].codice_regione) === regioniData.features[i].properties.cod_reg_n) {
        console.log('parseint',parseInt(arr[i].codice_regione), ' - ',arr[i].denominazione_regione, ' - Nuovi positivi: ', arr[i].nuovi_positivi, ' - Totale positivi: ', arr[i].totale_positivi)
        regioniData.features[i].properties.data = arr[i].data.slice(0,10);
        regioniData.features[i].properties.denominazione_regione = arr[i].denominazione_regione
        regioniData.features[i].properties.nuovi_positivi = arr[i].nuovi_positivi;
        regioniData.features[i].properties.totale_positivi = arr[i].totale_positivi;
      }
    }
  console.log("postjoin:",regioniData);
  console.log("arr: ",arr);

  // L.geoJson(regioniData).addTo(map);


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

 l1 = L.geoJson(regioniData, {style: style, onEachFeature: onEachFeature});
 l2 = L.geoJson(regioniData, {style: style2, onEachFeature: onEachFeature2});

 // geojson = L.geoJson(regioniData, {
  //     style: style,
  //     onEachFeature: onEachFeature
  // }).addTo(map);

// .addTo(map);

 var overlayMaps = {
    "Nuovi": l1,
    "Totale": l2
  };


// var groupedOverlays = {
//         "Dati COVID-19":{
//             "Nuovi": l1,
//             "Totale": l2
//         }

//     };

    // var options = {
    //   // Make the "Landmarks" group exclusive (use radio inputs)
    //   exclusiveGroups: ["Dati COVID-19"],
    //   // Show a checkbox next to non-exclusive group labels for toggling all
    //   groupCheckboxes: true
    // };

    
 // // Use the custom grouped layer control, not "L.control.layers"
 //    var layerControl = L.control.groupedLayers(baseMaps, groupedOverlays, options);
 //    map.addControl(layerControl);
 //   // End of switcher control.

   





 
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

  // function zoomToFeature(e) {
  //   map.fitBounds(e.target.getBounds());
  // }

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

  

//    var map = L.map('map', {
//     center: [42.114524, 13.0],
//     zoom: 6,
//     layers: [l1]
// });
var map = L.map('map').setView([42.114524, 13.0], 6);
var basemap;
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2hyaW1zb24iLCJhIjoiY2tqb2NjcDk3MWVuODJ6bWowM3p3dWVyYiJ9.-mQDMHqr4oTxb93esPdmKA'
}).addTo(map);

// .addTo(map);




  var info = L.control();

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

//info.addTo(map);

  var info2 = L.control();

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

  //info2.addTo(map);




  L.control.layers(null, overlayMaps, {collapsed: false}).addTo(map);
  // L.control.layers(null, overlays, {collapsed: false}).addTo(map);

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
              '<i style="background:' + getColor(grades[i] + 10) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };

//nuoviLegend.addTo(map);

map.on('overlayadd', function (eventLayer) {
    // Switch to the Population legend..
    if (eventLayer.name === 'Nuovi') {
        //this.removeControl(totaliLegend);
        info.addTo(this);
        nuoviLegend.addTo(this); 
    }

    if (eventLayer.name === 'Totale') {
        //this.removeControl(nuoviLegend);
        info2.addTo(this);
        totaliLegend.addTo(this);
    }
});

map.on('overlayremove', function (eventLayer) {
    // Switch to the Population legend..
    if (eventLayer.name === 'Nuovi') {
       // this.removeControl(nuoviLegend);
        this.removeControl(info);
        this.removeControl(nuoviLegend);
    } 

    if (eventLayer.name === 'Totale') {
       // this.removeControl(totaliLegend);
        this.removeControl(info2);
        this.removeControl(totaliLegend);
    }
});






  }
}


//console.log(regioniData);
//var map = L.map('map').setView([42.114524, 13.0], 6);


// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/light-v9',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1Ijoia2hyaW1zb24iLCJhIjoiY2tqb2NjcDk3MWVuODJ6bWowM3p3dWVyYiJ9.-mQDMHqr4oTxb93esPdmKA'
// }).addTo(map);

// var mapboxAccessToken = 'pk.eyJ1Ijoia2hyaW1zb24iLCJhIjoiY2tqb2NjcDk3MWVuODJ6bWowM3p3dWVyYiJ9.-mQDMHqr4oTxb93esPdmKA';
// var map = L.map('map').setView([37.8, -96], 4);

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
//     id: 'mapbox/light-v9',
//     attribution: ...,
//     tileSize: 512,
//     zoomOffset: -1
// }).addTo(map);

//L.geoJson(regioniData).addTo(map);

// function getColor(d) {
//     return d > 1000 ? '#800026' :
//            d > 500  ? '#BD0026' :
//            d > 200  ? '#E31A1C' :
//            d > 100  ? '#FC4E2A' :
//            d > 50   ? '#FD8D3C' :
//            d > 20   ? '#FEB24C' :
//            d > 10   ? '#FED976' :
//                       '#FFEDA0';
// }

// function style(feature) {
//     return {
//         fillColor: getColor(feature.properties.density),
//         weight: 2,
//         opacity: 1,
//         color: 'black',
//         dashArray: '3',
//         fillOpacity: 0.7
//     };
// }

// L.geoJson(regioniData, {style: style}).addTo(map);

// function highlightFeature(e) {
//     var layer = e.target;

//     layer.setStyle({
//         weight: 5,
//         color: '#666',
//         dashArray: '',
//         fillOpacity: 0.7
//     });

//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         layer.bringToFront();
//     }
// }