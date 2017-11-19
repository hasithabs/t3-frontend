angular
.module('app')
.component('busDetailsCom', {
  templateUrl: 'app/reports/template/bus-details.html',
  controller: function ($log, $q, BusDetailsSDK) {
    var self = this;
    self.busDetails = [];

    var obj1 = {BusID: 1, BusName: 'Bus01', Route: 'Maharagama - Pettah', StartTime: '2017-04-24T14:25:43.511Z', EndTime: '2017-04-24T20:25:43.511Z'};
    var obj2 = {BusID: 2, BusName: 'Bus02', Route: 'Kandy - Colombo', StartTime: '2017-04-24T14:25:43.511Z', EndTime: '2017-04-24T20:25:43.511Z'};

    self.busDetails.push(obj1);
    self.busDetails.push(obj2);

    function getBusDetails() {
        var deferred = $q.defer();
        BusDetailsSDK.getBusDetails().then(function (response) {
            self.busDetails = response.content;
            $log.log(self.busDetails);
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
