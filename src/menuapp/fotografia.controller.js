(function () {
'use strict';

angular.module('MenuApp')
.controller('FotografiaController', FotografiaController);


FotografiaController.$inject = ['items'];
function FotografiaController(items) {
  var fotografia = this;
	fotografia.items = {}; 
  	fotografia.items = items;
  	fotografia.giorno = fotografia.items.data.slice(8,10);
  	fotografia.mese = fotografia.items.data.slice(5,7);
  	fotografia.anno = fotografia.items.data.slice(0,4);
  	fotografia.datatrunc = 	fotografia.giorno.concat('/',fotografia.mese,'/', fotografia.anno);
}

})();
