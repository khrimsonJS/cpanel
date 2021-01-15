(function () {
'use strict';

angular.module('MenuApp')
.controller('ListaRegioni', ListaRegioni);


ListaRegioni.$inject = ['items'];
function ListaRegioni(items) {
  	var listareg = this;
	listareg.items = []; 
   	listareg.items = items;
}

})();
