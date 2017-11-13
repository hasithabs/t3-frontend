angular
  .module('core.service')
  .factory('HomeAPI',
    function ($resource) {
      // Public API
      var services = {
        greet: greet
      };

      function greet() {
        // ngResource to read `hello.json` and return its data
        var url = '/core/data/hello.json';
        return $resource(url, {}, {
          get: {
            method: 'GET',
            isArray: false,
            cancellable: true
          }
        });
      }

      // Return public API
      return services;
    });
