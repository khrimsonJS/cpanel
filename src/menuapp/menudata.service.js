(function () {
"use strict";

angular.module("data")
.service("MenuDataService", MenuDataService);

MenuDataService.$inject = ["$http"]
function MenuDataService($http) {
 var service = this;

service.getAndamentoNazionale = function () {
return $http({
        method: "GET",
        url: ("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json")
      }).then(function (response) {
        var andamentoNazionale = [];
        for (var i=0;i<response.data.length;i++) {
          response.data[i].popolaz = 59641488;
          response.data[i].incidenza = parseFloat((response.data[i].nuovi_positivi*100/response.data[i].popolaz).toPrecision(3));
          response.data[i].prevalenza = parseFloat((response.data[i].totale_positivi*100/response.data[i].popolaz).toPrecision(3));                  
          andamentoNazionale.push(response.data[i]);
        }
          andamentoNazionale.reverse();
          return andamentoNazionale;
      })
       .catch(function (error) {
          console.log(error);
      })

  }


  service.getAndamentoNazionaleData = function (data) {
  return $http({
        method: "GET",
        url: ("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json")
      }).then(function (response) {
        var andamentoNazionaleData = {};
        for (var i=0;i<response.data.length;i++) {
          if (response.data[i].data === data) {
            response.data[i].popolaz = 59641488;
            response.data[i].incidenza = parseFloat((response.data[i].nuovi_positivi*100/response.data[i].popolaz).toPrecision(3));
            response.data[i].prevalenza = parseFloat((response.data[i].totale_positivi*100/response.data[i].popolaz).toPrecision(3));         
            andamentoNazionaleData = response.data[i];
          }
        }
          return andamentoNazionaleData;
      })
       .catch(function (error) {
          console.log(error);
      })

  }  

service.getAndamentoRegionaleRegione = function (regione) {
return $http({
        method: "GET",
        url: ("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json")
      }).then(function (response) {
        var andamentoRegionaleRegione = [];
        for (var i=0;i<response.data.length;i++) {
            for (var j=0;j<regionipop.length;j++) {
              if ((response.data[i].denominazione_regione === regione) && (regionipop[j].Territorio === regione)) {
                  response.data[i].popolaz = regionipop[j].popolaz;
                  response.data[i].incidenza = parseFloat((response.data[i].nuovi_positivi*100/response.data[i].popolaz).toPrecision(3));
                  response.data[i].prevalenza = parseFloat((response.data[i].totale_positivi*100/response.data[i].popolaz).toPrecision(3)); 
                  andamentoRegionaleRegione.push(response.data[i]);
              }
            }
        }
            andamentoRegionaleRegione.reverse();
            return andamentoRegionaleRegione;
      })
       .catch(function (error) {
          console.log(error);
      })

  }

  service.getAndamentoRegionaleRegioneData = function (regione, data) {  
  return $http({
          method: "GET",
          url: ("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json")
        }).then(function (response) {
          var andamentoRegionaleRegioneData = [];
          for (var i=0;i<response.data.length;i++) {
              for (var j=0;j<regionipop.length;j++) {
                if ((response.data[i].denominazione_regione === regione) && (response.data[i].data === data) && (regionipop[j].Territorio === regione)) {
                  response.data[i].popolaz = regionipop[j].popolaz;
                  response.data[i].incidenza = parseFloat((response.data[i].nuovi_positivi*100/response.data[i].popolaz).toPrecision(3));
                  response.data[i].prevalenza = parseFloat((response.data[i].totale_positivi*100/response.data[i].popolaz).toPrecision(3)); 
                  andamentoRegionaleRegioneData = response.data[i];
                }
              }
          }
            return andamentoRegionaleRegioneData;
        })
         .catch(function (error) {
            console.log(error);
        })

  }   

  service.getNazionaleLatest = function () {
  return $http({
          method: "GET",
          url: ("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json")
        }).then(function (response) {
          var nazionaleLatest = {};
          nazionaleLatest = response.data;
          nazionaleLatest[0].incidenza = (nazionaleLatest[0].nuovi_positivi*100/59641488).toPrecision(3);
          nazionaleLatest[0].prevalenza = (nazionaleLatest[0].totale_positivi*100/59641488).toPrecision(3);      
          return nazionaleLatest;
        })
         .catch(function (error) {
            console.log(error);
        })
  }

  service.getRegioniLatest = function() {
  return $http({
          method: "GET",
          url: ("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json")
        }).then(function (response) {
          var regioniLatest = [];


          for (var i=0;i<response.data.length;i++) {
            for (var j=0;j<regioniData.features.length;j++) {
              if (parseInt(response.data[i].codice_regione) === regioniData.features[j].properties.cod_reg_n) {
                    regioniData.features[j].properties.data = response.data[i].data.slice(0,10);
                    regioniData.features[j].properties.denominazione_regione = response.data[i].denominazione_regione
                    regioniData.features[j].properties.nuovi_positivi = response.data[i].nuovi_positivi;
                    regioniData.features[j].properties.totale_positivi = response.data[i].totale_positivi;
                    regioniData.features[j].properties.incidenza = parseFloat((response.data[i].nuovi_positivi*100/regioniData.features[j].properties.popolaz).toPrecision(3));
                    regioniData.features[j].properties.prevalenza = parseFloat((response.data[i].totale_positivi*100/regioniData.features[j].properties.popolaz).toPrecision(3));

              }
            }
          }
            return regioniData;
        })
         .catch(function (error) {
            console.log(error);
        })
  }

  service.getTk = function() {
      var tk = 'pk.eyJ1Ijoia2hyaW1zb24iLCJhIjoiY2tqb2NjcDk3MWVuODJ6bWowM3p3dWVyYiJ9.-mQDMHqr4oTxb93esPdmKA';
      return tk;
  }

  service.getRegioni = function () {
    var regioni = [
      "Abruzzo",
      "Basilicata",
      "Calabria",
      "Campania",
      "Emilia-Romagna",
      "Friuli Venezia Giulia",
      "Lazio",
      "Liguria",
      "Lombardia",
      "Marche",
      "Molise",
      "P.A. Bolzano",
      "P.A. Trento",
      "Piemonte",
      "Puglia",
      "Sardegna",
      "Sicilia",
      "Toscana",
      "Umbria",
      "Valle d'Aosta",
      "Veneto"];
      return regioni;
  }

} //close service

})();
