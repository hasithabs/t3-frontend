angular
.module('core.service')
.factory('BusDetailsAPI',
function ($resource, SETTINGS) {
  var services = {
    busDetails: busDetails
  };

  function busDetails() {
    var url = SETTINGS.SITE_URL + '/busdetails';
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
