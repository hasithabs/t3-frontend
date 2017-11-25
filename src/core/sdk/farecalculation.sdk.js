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

      this.updateCard = function (cardObj) {
        var deferred = $q.defer();
        FareCalculationAPI.card().update({id: cardObj.card_number}, cardObj).$promise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          deferred.reject(error);
        });
        $log.debug('FareCalculationSDK:updateCard');
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

      this.getTrip = function (tripId) {
        var deferred = $q.defer();
        FareCalculationAPI.trip().get({id: tripId}).$promise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          deferred.reject(error);
        });
        $log.debug('FareCalculationSDK:getTrip');
        return deferred.promise;
      };

      this.savePayment = function (paymentObj) {
        var deferred = $q.defer();
        FareCalculationAPI.payment().save(paymentObj).$promise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          deferred.reject(error);
        });
        $log.debug('FareCalculationSDK:savePayment');
        return deferred.promise;
      };
    });
