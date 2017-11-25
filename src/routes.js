angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
// function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
function routesConfig($stateProvider, $urlRouterProvider) {
  // $locationProvider.html5Mode(true).hashPrefix('!'); //uncomment when running on server
  $urlRouterProvider.otherwise('/app/dashboard');

  $stateProvider
    .state('app', {
      url: '/app',
      component: 'homeCom'
    })
    .state('app.dashboard', {
      url: '/dashboard',
      views: {
        mainContent: {
          component: 'dashboardCom'
        }
      }
    })
    .state('app.report', {
      url: '/report',
      views: {
        mainContent: {
          component: 'reportCom'
        }
      }
    })
    .state('app.bus-details', {
      url: '/bus-details',
      views: {
        mainContent: {
          component: 'busDetailsCom'
        }
      }
    })
    .state('app.route-details', {
      url: '/route-details',
      views: {
        mainContent: {
          component: 'routeDetailsCom'
        }
      }
    })
    .state('app.sample', {
      url: '/sample',
      views: {
        mainContent: {
          component: 'sampleCom'
        }
      }
    })
    .state('app.topup', {
      url: '/topup',
      views: {
        mainContent: {
          component: 'topupCom'
        }
      }
    })
    .state('app.checkin', {
      url: '/checkin',
      views: {
        mainContent: {
          component: 'checkinCom'
        }
      }
    })
    .state('app.checkout', {
      url: '/checkout',
      views: {
        mainContent: {
          component: 'checkoutCom'
        }
      }
    });
}
