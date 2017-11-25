angular
  .module('core.service')
  .factory('FareCalculationAPI',
    function ($resource, SETTINGS) {
      // Public API
      var services = {
        card: card,
        bus: bus,
        route: route,
        trip: trip,
        payment: payment
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

      function trip() {
        var url = SETTINGS.SITE_URL + '/trips/:id';
        return $resource(url, {did: '@id'}, {
          get: {
            method: 'GET',
            isArray: false,
            cancellable: true
          }
        });
      }

      function payment() {
        var url = SETTINGS.SITE_URL + ' payments/:id';
        return $resource(url, {did: '@id'}, {
          get: {
            method: 'GET',
            isArray: false,
            cancellable: true
          },
          save: {
            method: 'POST',
            isArray: false,
            cancellable: true
          }
        });
      }

      return services;
    });
