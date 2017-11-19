angular
  .module('core.sdk')
  .service('FareCalculationSDK',
    function ($log, $q, FareCalculationAPI) {
      this.getCards = function (cardId) {
        var deferred = $q.defer();
        FareCalculationAPI.card().get({id: cardId}).$promise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          deferred.reject(error);
        });
        $log.debug('FareCalculationSDK:getCards');
        return deferred.promise;
      };
    });
