angular
  .module('core.sdk')
  .service('HomeSDK',
    function ($q, HomeAPI) {
      this.getGreet = function () {
        // Construct $q provider
        var deferred = $q.defer();
        // Call `greet` method in `HomeAPI` and catch the returned promise
        HomeAPI.greet().get().$promise.then(function (response) {
          // Resolve the success response
          deferred.resolve(response);
        }, function (error) {
          // Reject the error
          deferred.reject(error);
        });
        // Return promise
        return deferred.promise;
      };
    });
