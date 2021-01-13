(function () {
'use strict';

angular.module('MenuApp')
.controller('ListaRegioni', ListaRegioni);


ListaRegioni.$inject = ['items'];
function ListaRegioni(items) {
  	var listareg = this;
	listareg.items = []; 
   	listareg.items = items;
   	console.log("items[0]: ",listareg.items[0]);
	//console.log("listareg.items[0].data): ",listareg.items[0].data);

}

})();
