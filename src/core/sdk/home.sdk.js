angular
  .module('core.sdk')
  .service('HomeSDK',
    function ($q, HomeAPI) {
      this.getGreet = function () {
        var deferred = $q.defer();
        HomeAPI.greet().get().$promise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      };
    });
