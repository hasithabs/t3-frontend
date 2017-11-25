angular
    .module('app')
    .component('tripDetailsCom', {
        templateUrl: 'app/reports/template/trip-details.html',
        controller: function ($log, $q, $rootScope, NgMap, SETTINGS, reportsSDK) {
            var self = this;
            self.searchText ='';
            self.tripDetails = [];
            self.busDetails = [];
            self.trips = [];
            self.routeDetails = [];       

            function getRouteDetails() {
                var deferred = $q.defer();
                reportsSDK.getRouteDetails().then(function (response) {
                    self.routeDetails = response.content;
                    console.log('route');
                    console.log(response.content);
                    deferred.resolve(response);
                }, function (error) {
                    $log.debug(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            }
            getRouteDetails();

            function getBusDetails() {
                var deferred = $q.defer();
                reportsSDK.getBusDetails().then(function (response) {
                    self.busDetails = response.content;
                    console.log('bus');
                    console.log(response.content);
                    deferred.resolve(response);
                }, function (error) {
                    $log.debug(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            }

            function getTripDetails() {
                var deferred = $q.defer();
                reportsSDK.getTripDetails().then(function (response) {
                    console.log('trip');
                    console.log(response.content);
                    self.tripDetails = response.content;
                    angular.forEach(self.busDetails, function (bus, key) {
                        angular.forEach(self.tripDetails, function (trip, key) {
                            angular.forEach(self.routeDetails, function (route, key) {
                                if(bus.bus_id == trip.bus_id && trip.route_id == route.id){
                                    self.trips.push(new tripObj(bus,trip,route));
                                }
                            });
                        });
                    });
                    deferred.resolve(response);
                }, function (error) {
                    $log.debug(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            }

            function tripObj(bus,trip,route){
                var to = this;
                to.tripid = trip.id;
                to.pasCount = trip.passenger_count;
                to.totIncome = trip.total_income;
                to.bus = bus.bus_number;
                to.busType = bus.bus_type;
                to.route = route.route_id;
                to.routeName = route.route_name;
            }
            getBusDetails();
            getTripDetails();

           
        }
    });
