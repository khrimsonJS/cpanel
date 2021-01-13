(function () {
"use strict";

angular.module("data")
.service("MenuDataService", MenuDataService);


MenuDataService.$inject = ["$http", "$q", "$timeout"]
function MenuDataService($http, $q, $timeout) {
 var service = this;

service.getAndamentoLatest = function() {
return $http({
        method: "GET",
        url: ("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json")
      }).then(function (response) {
        var andamentoNazionaleLatest = {};
          andamentoNazionaleLatest = response.data;
          //console.log(andamentoNazionaleLatest.length);
          //console.log(andamentoNazionaleLatest);
          return andamentoNazionaleLatest;
      })
       .catch(function (error) {
          console.log(error);
      })

  } 

    //getCategories

service.getAndamentoNazionale = function () {
return $http({
        method: "GET",
        url: ("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json")
      }).then(function (response) {
        var andamentoNazionale = [];
        for (var i=0;i<response.data.length;i++) {
          andamentoNazionale.push(response.data[i]);
        }
          //console.log(andamentoNazionale.length);
          //console.log(andamentoNazionale);
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
          andamentoNazionaleData = response.data[i];
          }
        }
          //console.log(andamentoNazionaleData.length);
          //console.log(andamentoNazionaleData);
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
          if (response.data[i].denominazione_regione === regione) {
          andamentoRegionaleRegione.push(response.data[i]);
          }
        }
           andamentoRegionaleRegione.reverse();
          //console.log(andamentoRegionaleRegione.length);
          //console.log(andamentoRegionaleRegione);
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
            if ((response.data[i].denominazione_regione === regione) &&(response.data[i].data === data)) {
            //console.log("regione+data: ",response.data[i].denominazione_regione, ' - ', response.data[i].data )
            andamentoRegionaleRegioneData = response.data[i];
            }
          }
            //console.log(andamentoRegionaleRegioneData.length);
            //console.log("andamentoRegionaleRegioneData: ",andamentoRegionaleRegioneData);
            return andamentoRegionaleRegioneData;
        })
         .catch(function (error) {
            console.log(error);
        })

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

  service.getNazionaleLatest = function () {
  return $http({
          method: "GET",
          url: ("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json")
        }).then(function (response) {
          var nazionaleLatest = {};
          nazionaleLatest = response.data;
          //console.log('nazionaleLatest:',nazionaleLatest);       
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
                    //console.log('parseint',parseInt(response.data[i].codice_regione));
                    regioniData.features[j].properties.data = response.data[i].data.slice(0,10);
                    regioniData.features[j].properties.denominazione_regione = response.data[i].denominazione_regione
                    regioniData.features[j].properties.nuovi_positivi = response.data[i].nuovi_positivi;
                    regioniData.features[j].properties.totale_positivi = response.data[i].totale_positivi;
              }
            }
          console.log("postjoin:",regioniData);
          }
            return regioniData;
        })
         .catch(function (error) {
            console.log(error);
        })
  }



//-----------------------------------//

service.getObj = function () {

objlist = [];
obj1 = {
  name: "firstname",
  short_name: "F"
};
obj2 = {
  name: "Secondname",
  short_name: "S"
};

objlist.push(obj1);
objlist.push(obj2);
console.log(objlist);

var deferred = $q.defer();

    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      deferred.resolve(objlist);
    }, 800);

console.log(deferred.promise)
return deferred.promise;

}

} //close service

})();
