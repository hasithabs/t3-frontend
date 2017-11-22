angular
.module('app')
.component('busDetailsCom', {
  templateUrl: 'app/reports/template/bus-details.html',
  controller: function ($log, $q, reportsSDK) {
    var self = this;
    self.busDetails = [];

    function getBusDetails() {
        var deferred = $q.defer();
        reportsSDK.getBusDetails().then(function (response) {
            self.busDetails = response.content;
            deferred.resolve(response);
        }, function (error) {
            $log.debug(error);
            deferred.reject(error);
        });
        return deferred.promise;
    }
    getBusDetails();
  }
});
