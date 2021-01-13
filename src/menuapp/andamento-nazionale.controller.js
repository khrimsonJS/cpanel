(function () {
'use strict';

angular.module('MenuApp')
.controller('AndamentoNazionaleController', AndamentoNazionaleController);


AndamentoNazionaleController.$inject = ['items'];
function AndamentoNazionaleController(items) {
  	var andamento = this;
	
	andamento.items = []; 
   	andamento.items = items;
   	//console.log("items[0]: ",andamento.items[0]);
	//console.log("andamento.items[0].data: ",andamento.items[0].data);
	andamento.gdata = [];
	 andamento.gitems = [].concat(andamento.items).reverse();
	 //console.log(andamento.gitems);
	 andamento.glabel = [];
	 andamento.gdatatot = [];
	 andamento.gdatanew = [];			 
	for (var i=0;i<andamento.gitems.length;i++) {
		// if (andamento.gitems[i].data.slice(8,10) === '01') {
			andamento.glabel.push(andamento.gitems[i].data.slice(5,7).concat(' / ',andamento.gitems[i].data.slice(0,4)));
			andamento.gdatatot.push(andamento.gitems[i].totale_positivi);
			andamento.gdatanew.push(andamento.gitems[i].nuovi_positivi);

			//console.log('andamento.gitems[i].data.slice(8,10): ',andamento.gitems[i].data.slice(8,10),'andamento.gitems[i].data.slice(5,7): ',andamento.gitems[i].data.slice(5,7))

		// }
		
	}

//console.log('data', andamento.gdata);

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
    options: {}
});


}

})();
