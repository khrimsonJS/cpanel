(function () {
'use strict';

angular.module('MenuApp')
.controller('FotografiaRegController', FotografiaRegController);


FotografiaRegController.$inject = ['items'];
function FotografiaRegController(items) {
  var fotografiareg = this;
	fotografiareg.items = {}; 
  	fotografiareg.items = items;
  	fotografiareg.giorno = fotografiareg.items.data.slice(8,10);
  	fotografiareg.mese = fotografiareg.items.data.slice(5,7);
  	fotografiareg.anno = fotografiareg.items.data.slice(0,4);
  	fotografiareg.datatrunc = 	fotografiareg.giorno.concat('/',fotografiareg.mese,'/', fotografiareg.anno);
	// console.log("fotografiareg.regione: ", fotografiareg.regione);
	// console.log("items: ", items);
	// console.log("fotografiareg.items: ",fotografiareg.items);
	// console.log("substr: ",fotografiareg.datatrunc);

}

})();
