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

      this.getBus = function (busId) {
        var deferred = $q.defer();
        FareCalculationAPI.bus().get({id: busId}).$promise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          deferred.reject(error);
        });
        $log.debug('FareCalculationSDK:getBus');
        return deferred.promise;
      };

      this.getRoute = function (routeId) {
        var deferred = $q.defer();
        FareCalculationAPI.route().get({id: routeId}).$promise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          deferred.reject(error);
        });
        $log.debug('FareCalculationSDK:getRoute');
        return deferred.promise;
      };
    });
