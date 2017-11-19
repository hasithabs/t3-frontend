angular
.module('core.sdk')
.service('BusDetailsSDK',
function ($log, $q, BusDetailsAPI) {
  this.getBusDetails = function () {
    var deferred = $q.defer();
    BusDetailsAPI.busDetails().get().$promise.then(function (response) {
      deferred.resolve(response);
    }, function (error) {
      deferred.reject(error);
    });
    $log.debug('BusDetailsSDK:getBusDetails');
    return deferred.promise;
  };
});
