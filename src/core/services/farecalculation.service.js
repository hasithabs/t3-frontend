angular
  .module('core.service')
  .factory('FareCalculationAPI',
    function ($resource, SETTINGS) {
      // Public API
      var services = {
        card: card,
        bus: bus,
        route: route
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

      function bus() {
        var url = SETTINGS.SITE_URL + '/buses/:id';
        return $resource(url, {did: '@id'}, {
          get: {
            method: 'GET',
            isArray: false,
            cancellable: true
          }
        });
      }

      function route() {
        var url = SETTINGS.SITE_URL + '/routes/:id';
        return $resource(url, {did: '@id'}, {
          get: {
            method: 'GET',
            isArray: false,
            cancellable: true
          }
        });
      }

      return services;
    });
