(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html',
    controller: 'HomeController as home',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getRegioniLatest();
      }],
      latest: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getNazionaleLatest();
      }],
      tk: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getTk();
      }]   
    }
  })
 
  //Andamento nazionale 
  .state('andamento-nazionale', {
    url: '/andamento-nazionale',
    templateUrl: 'src/menuapp/templates/andamento-nazionale.template.html',
    controller: 'AndamentoNazionaleController as andamento',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAndamentoNazionale();
      }]
    }
  })

//Fotografia nazionale
  .state('fotografia', {
    url: '/andamento-nazionale/fotografia/{data}',
    templateUrl: 'src/menuapp/templates/fotografia.template.html',
    controller: 'FotografiaController as fotografia',
    resolve: {
      items: ['MenuDataService','$stateParams', function (MenuDataService, $stateParams) {
        return MenuDataService.getAndamentoNazionaleData($stateParams.data);
      }]
    }
  })

  //lista regioni
.state('lista-regioni', {
    url: '/andamento-regionale/lista-regioni',
    templateUrl: 'src/menuapp/templates/lista-regioni.template.html',
    controller: 'ListaRegioni as listareg',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getRegioni();
      }]
    }
  
  })

//Andamento regionale 
  .state('andamento-regionale', {
    url: '/andamento-regionale/{regione}',
    templateUrl: 'src/menuapp/templates/andamento-regionale.template.html',
    controller: 'AndamentoRegionaleController as regionale',
    resolve: {
      items: ['MenuDataService','$stateParams', function (MenuDataService, $stateParams) {
        return MenuDataService.getAndamentoRegionaleRegione($stateParams.regione);
      }],
      regione: ['$stateParams', function ($stateParams) {
        return $stateParams.regione;
    }]
    }
  })

  //Fotografia regionale
  .state('fotografia-reg', {
    url: '/andamento-regionale/{regione}/fotografia/{data}',
    templateUrl: 'src/menuapp/templates/fotografia-reg.template.html',
    controller: 'FotografiaRegController as fotografiareg',
    resolve: {
      items: ['MenuDataService','$stateParams', function (MenuDataService, $stateParams) {
        //console.log(MenuDataService.getAndamentoRegionaleRegioneData("Abruzzo", $stateParams.data));
        return MenuDataService.getAndamentoRegionaleRegioneData($stateParams.regione, $stateParams.data );
      }],
      regione: ['$stateParams', function ($stateParams) {
        return $stateParams.regione;
    }]
    }
  })


// //Item Detail
//   .state('categories.menu-items.item-detail', {
//     url: '/menu-items/{catId}',
//     templateUrl: 'src/menuapp/templates/item-detail.template.html',
//     controller: "itemDetailController as itemdetail"
//   });

 }

})();
