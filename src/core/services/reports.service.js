angular
.module('core.service')
.factory('ReportsAPI',
function ($resource, SETTINGS) {
  var services = {
    busDetails: busDetails,
    routeDetails: routeDetails,
    tripDetails: tripDetails
  };

  function busDetails() {
    var url = SETTINGS.SITE_URL + '/buses';
    return $resource(url, {}, {
      get: {
        method: 'GET',
        isArray: false,
        cancellable: true
      }
    });
  }
  function routeDetails() {
    var url = SETTINGS.SITE_URL + '/routes';
    return $resource(url, {}, {
      get: {
        method: 'GET',
        isArray: false,
        cancellable: true
      }
    });
  }
  function tripDetails() {
    var url = SETTINGS.SITE_URL + '/trips';
    return $resource(url, {}, {
      get: {
        method: 'GET',
        isArray: false,
        cancellable: true
      }
    });
  }
  return services;
});




