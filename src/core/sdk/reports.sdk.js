angular
.module('core.sdk')
.service('reportsSDK',
function ($log, $q, ReportsAPI) {
  this.getBusDetails = function () {
    var deferred = $q.defer();
    ReportsAPI.busDetails().get().$promise.then(function (response) {
      deferred.resolve(response);
    }, function (error) {
      deferred.reject(error);
    });
    $log.debug('reportsSDK:getBusDetails');
    return deferred.promise;
  };
  this.getRouteDetails = function () {
    var deferred = $q.defer();
    ReportsAPI.routeDetails().get().$promise.then(function (response) {
      deferred.resolve(response);
    }, function (error) {
      deferred.reject(error);
    });
    $log.debug('reportsSDK:getRouteDetails');
    return deferred.promise;
  };
});
