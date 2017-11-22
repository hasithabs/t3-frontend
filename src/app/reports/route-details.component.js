angular
.module('app')
.component('routeDetailsCom', {
  templateUrl: 'app/reports/template/route-details.html',
  controller: function ($log, $q, BusDetailsSDK,$rootScope,NgMap,SETTINGS,reportsSDK) {
    var self = this;
    self.routeDetails = [];
    self.MapAPIKey = SETTINGS.MAP_API_KEY;
    self.StartPoint = '';
    self.EndPoint = '';

    NgMap.getMap().then(function(map) {
        self.map = map;
      });

      function getRouteDetails() {
        var deferred = $q.defer();
        reportsSDK.getRouteDetails().then(function (response) {
            self.routeDetails = response.content;
            deferred.resolve(response);
        }, function (error) {
            $log.debug(error);
            deferred.reject(error);
        });
        return deferred.promise;
    }
    getRouteDetails();

    self.setMap = function(start,end){
        self.StartPoint = start;
        self.EndPoint = end;
    }
  }
});
