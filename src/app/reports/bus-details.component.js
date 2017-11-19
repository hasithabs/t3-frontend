angular
.module('app')
.component('busDetailsCom', {
  templateUrl: 'app/reports/template/bus-details.html',
  controller: function ($log) {
    var self = this;
    self.busDetails = [];

    // var obj1 = {BusID: 1, BusName: 'Bus01', StartTime: '2017-04-24T14:25:43.511Z', EndTime: '2017-04-24T20:25:43.511Z'};
    // var obj2 = {BusID: 2, BusName: 'Bus02', StartTime: '2017-04-24T14:25:43.511Z', EndTime: '2017-04-24T20:25:43.511Z'};

    // self.busDetails.push(obj1);
    // self.busDetails.push(obj2);

    $log.log(self.busDetails);
  }
});
