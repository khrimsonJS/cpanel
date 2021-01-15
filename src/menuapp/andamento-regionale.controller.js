(function () {
'use strict';

angular.module('MenuApp')
.controller('AndamentoRegionaleController', AndamentoRegionaleController);


AndamentoRegionaleController.$inject = ['items'];
function AndamentoRegionaleController(items) {
  	var regionale = this;
	
	regionale.items = []; 
   	regionale.items = items;

	regionale.gitems = [].concat(regionale.items).reverse();
	regionale.glabel = [];
	regionale.gdatatot = [];
	regionale.gdatanew = [];
	regionale.gdatainc = [];
	regionale.gdataprev = [];
	regionale.gdataincmol = [];				 
	for (var i=0;i<regionale.gitems.length;i++) {
			regionale.glabel.push(regionale.gitems[i].data.slice(8,10).concat('/',regionale.gitems[i].data.slice(5,7),'/',regionale.gitems[i].data.slice(0,4)));
			regionale.gdatatot.push(regionale.gitems[i].totale_positivi);
			regionale.gdatanew.push(regionale.gitems[i].nuovi_positivi);
			regionale.gdatainc.push(regionale.gitems[i].incidenza);
			regionale.gdataprev.push(regionale.gitems[i].prevalenza);
			regionale.gdataincmol.push(regionale.gitems[i].incidenza*10000);
		
	}

	//console.log('regionale.gdataincmol:',regionale.gdataincmol);
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
	    options: {
        layout: {
            padding: {
                left: 10,
                right: 20,
                top: 0,
                bottom: 0
            }
        }
    }
	});

var ctx2 = document.getElementById('myChart2').getContext('2d');
	var chart2 = new Chart(ctx2, {
	    // The type of chart we want to create
	    type: 'bar',

	    // The data for our dataset
	    data: {
	        labels: regionale.glabel,
	        datasets: [{
	            label: 'Incidenza',
	            backgroundColor: 'rgb(255, 99, 132)',
	            borderColor: 'rgb(255, 99, 132)',
	            data: regionale.gdatainc
	        },
	        {
	            label: 'Prevalenza',
	            backgroundColor: 'rgb(0, 255, 132)',
	            borderColor: 'rgb(0, 255, 132)',
	            data: regionale.gdataprev
	        }

	        ]
	    },

	    // Configuration options go here
	    options: {
        layout: {
            padding: {
                left: 10,
                right: 20,
                top: 0,
                bottom: 0
            }
        }
    }
	});

} //close controller

})();
