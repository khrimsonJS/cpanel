(function () {
'use strict';

angular.module('MenuApp')
.controller('AndamentoNazionaleController', AndamentoNazionaleController);


AndamentoNazionaleController.$inject = ['items'];
function AndamentoNazionaleController(items) {
  	var andamento = this;
	
	andamento.items = []; 
   	andamento.items = items;
	andamento.gdata = [];
	andamento.gitems = [].concat(andamento.items).reverse();
	andamento.glabel = [];
	andamento.gdatatot = [];
	andamento.gdatanew = [];
    andamento.gdatainc = [];
    andamento.gdataprev = [];

	for (var i=0;i<andamento.gitems.length;i++) {
			andamento.glabel.push(andamento.gitems[i].data.slice(8,10).concat('/',andamento.gitems[i].data.slice(5,7),'/',andamento.gitems[i].data.slice(0,4)));
			andamento.gdatatot.push(andamento.gitems[i].totale_positivi);
			andamento.gdatanew.push(andamento.gitems[i].nuovi_positivi);
            andamento.gdatainc.push(andamento.gitems[i].incidenza);
            andamento.gdataprev.push(andamento.gitems[i].prevalenza);
	}

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: andamento.glabel,
        datasets: [{
            label: 'Totale positivi',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: andamento.gdatatot
        },
        {
            label: 'Nuovi positivi',
            backgroundColor: 'rgb(0, 255, 132)',
            borderColor: 'rgb(0, 255, 132)',
            data: andamento.gdatanew
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
        labels: andamento.glabel,
        datasets: [{
            label: 'Prevalenza',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: andamento.gdatainc
        },
        {
            label: 'Incidenza',
            backgroundColor: 'rgb(0, 255, 132)',
            borderColor: 'rgb(0, 255, 132)',
            data: andamento.gdataprev
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

