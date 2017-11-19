angular
  .module('core.service')
  .factory('FareCalculationAPI',
    function ($resource, SETTINGS) {
      // Public API
      var services = {
        card: card
      };

      function card() {
        var url = SETTINGS.SITE_URL + '/cards/:id';
        return $resource(url, {did: '@id'}, {
          get: {
            method: 'GET',
            isArray: false,
            cancellable: true
          },
          update: {
            method: 'PUT',
            isArray: false,
            cancellable: true
          }
        });
      }

      return services;
    });
