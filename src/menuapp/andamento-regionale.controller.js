(function () {
'use strict';

angular.module('MenuApp')
.controller('AndamentoRegionaleController', AndamentoRegionaleController);


AndamentoRegionaleController.$inject = ['items'];
function AndamentoRegionaleController(items) {
  	var regionale = this;
	
	regionale.items = []; 
   	regionale.items = items;
   	regionale.denominazione_regione = items[0].denominazione_regione;
   	//console.log("items[0]: ",regionale.items[0]);
	//console.log("regionale.items[0].data: ",regionale.items[0].data);


	regionale.gitems = [].concat(regionale.items).reverse();
	 //console.log(regionale.gitems);
	 regionale.glabel = [];
	 regionale.gdatatot = [];
	 regionale.gdatanew = [];			 
	for (var i=0;i<regionale.gitems.length;i++) {
			regionale.glabel.push(regionale.gitems[i].data.slice(5,7).concat(' / ',regionale.gitems[i].data.slice(0,4)));
			regionale.gdatatot.push(regionale.gitems[i].totale_positivi);
			regionale.gdatanew.push(regionale.gitems[i].nuovi_positivi);		
	}

	var ctx = document.getElementById('myChart').getContext('2d');
	var chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'bar',

	    // The data for our dataset
	    data: {
	        labels: regionale.glabel,
	        datasets: [{
	            label: 'Totale positivi',
	            backgroundColor: 'rgb(255, 99, 132)',
	            borderColor: 'rgb(255, 99, 132)',
	            data: regionale.gdatatot
	        },
	        {
	            label: 'Nuovi positivi',
	            backgroundColor: 'rgb(0, 255, 132)',
	            borderColor: 'rgb(0, 255, 132)',
	            data: regionale.gdatanew
	        }

	        ]
	    },

	    // Configuration options go here
	    options: {}
	});

//console.log('data', regionale.gdata);


} //close controller

})();
