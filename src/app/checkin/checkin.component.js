angular
  .module('app')
  .component('checkinCom', {
    templateUrl: 'app/checkin/template/checkin.html',
    controller: function ($log, $q, FareCalculationSDK, SweetAlert, moment, Notification) {
      var self = this;

      self.dateNow = moment().format('h:mm:ss - MMMM Do YYYY');;

      self.checkinSubmitBtnClicked = false;
      self.isCardValid = false;
      self.isDestinationKnow = false;

      self.busId = 1;
      self.routeId = 1;
      self.cardId = 123456;

      self.checkinLocatin = "Malabe Bus Station, Malabe";
      self.travelMode = "DRIVING";
      self.travelRate = 10/1000;
      // self.origin = "Kandy-Colombo Intercity Bus Station";
      // self.destination = "Colombo Central Bus Stand";

      /**
       * Gets the bus details.
       *
       * @return     {object}  The bus details.
       */
      function getBusDetails() {
        var deferred = $q.defer();
        FareCalculationSDK.getBus(self.busId).then(function (response) {
          self.busDetails = response.content[0];
          $log.log("*********self.busDetails********");
          $log.log(self.busDetails);
          deferred.resolve(response.content);
        }, function (error) {
          $log.debug(error);
          deferred.reject(error);
        });

        return deferred.promise;
      }

      /**
       * Gets the route details.
       *
       * @return     {object}  The route details.
       */
      function getRouteDetails() {
        var deferred = $q.defer();
        FareCalculationSDK.getRoute(self.routeId).then(function (response) {
          self.routeDetails = response.content[0];
          $log.log("*********self.routeDetails********");
          $log.log(self.routeDetails);
          deferred.resolve(response.content);

          getGoogleMapDetails(self.routeDetails.start, self.routeDetails.end);
        }, function (error) {
          $log.debug(error);
          deferred.reject(error);
        });

        return deferred.promise;
      }

      /**
       * Gets the card details.
       *
       * @param      {int}  cardId  The card identifier
       */
      function getCardDetails(cardId) {
        var deferred = $q.defer();
        FareCalculationSDK.getCards(cardId).then(function (response) {
          self.cardDetails = response.content[0];
          $log.log("*********self.cardDetails********");
          $log.log(self.cardDetails);
          deferred.resolve(response.content);
        }, function (error) {
          $log.debug(error);
          deferred.reject(error);
        });

        return deferred.promise;
      }

      /**
       * Gets the google map details.
       *
       * @param      {string}  start   The start
       * @param      {string}  end     The end
       */
      var directionsService = new google.maps.DirectionsService();
      function getGoogleMapDetails(startLocation, endLocation) {
        var deferred = $q.defer();

        var request = {
          origin      : startLocation,
          destination : endLocation,
          travelMode  : self.travelMode
        };

        directionsService.route(request, function(response, status) {
          console.log(response);
          console.log(status);
          if ( status == google.maps.DirectionsStatus.OK ) {
            deferred.resolve(response.routes[0].legs[0]);
            self.tripDistance = response.routes[0].legs[0].distance;
            self.tripDuration = response.routes[0].legs[0].duration;
          }
          else {
            deferred.reject(status);
          }
        });

        return deferred.promise;
      }

      getBusDetails();
      getRouteDetails();

      function promptDestination() {
        self.isDestinationKnow = true;
        swal({
          title: "",
          text: "Please enter your destination place",
          type: "input",
          showCancelButton: false,
          closeOnConfirm: false,
          inputPlaceholder: "Type Destination"
        }, function (inputValue) {
          if (inputValue === false) return false;
          if (inputValue === "") {
            swal.showInputError("You need to write something!");
            return false
          }

          getGoogleMapDetails(self.routeDetails.start, inputValue).then(function ( response) {
            if (self.cardDetails.balance < response.distance.value * self.travelRate) {
              SweetAlert.swal({
                title: "Oops!",
                text: "Your current balance is not enough to travel to the given destination",
                type: "error",
                timer: 3000,
                showConfirmButton: true
              }, function () {
                SweetAlert.close();
                return true;
              });
            } else {
              self.routeDetails.end = inputValue;
              SweetAlert.swal({
                title: "Nice!",
                text: "You'll arrive in " + self.tripDuration.text,
                type: "success",
                timer: 2000,
                showConfirmButton: true
              }, function () {
                SweetAlert.close();
                return true;
              });
            }
          }, function (error) {
            Notification.error("We can't find your destination. Please try again");
              // SweetAlert.swal({
              //   title: "Oops!",
              //   text: "We can't find your destination.",
              //   type: "error",
              //   timer: 2000,
              //   showConfirmButton: false
              // }, function () {
              //   return false;
              // });
          });
        })
      }

      /**
       * Passenger Check In
       */
      self.onCheckInClicked = function () {
        self.checkinSubmitBtnClicked = true;

        if (self.checkInForm.$invalid) {
          return;
        }

        getCardDetails(self.cardId).then(function (cardItem) {
          console.log(cardItem);

          if (cardItem.length == 0) {
            SweetAlert.swal({
              title: "Oops!",
              text: "T3 Card not found.",
              type: "error",
              timer: 2000,
              showConfirmButton: true
            }, function () {
              SweetAlert.close();
            });
            return;
          } else {
            cardItem = cardItem[0];
          }

          if (cardItem.status !== "active") {
            SweetAlert.swal({
              title: "Oops!",
              text: "Your card is deactivated",
              type: "error",
              timer: 2000,
              showConfirmButton: true
            }, function () {
              SweetAlert.close();
              return false;
            });
          }

          if (moment().diff(cardItem.expiry_date, 'days') >= 0) {
            SweetAlert.swal({
              title: "Oops!",
              text: "Your card is expired.",
              type: "error",
              timer: 2000,
              showConfirmButton: true
            }, function () {
              SweetAlert.close();
              return false;
            });
          }

          if (cardItem.balance < self.tripDistance.value * self.travelRate) {
            promptDestination();
          }

          self.isCardValid = true;

        }, function (error) {
          SweetAlert.swal({
            title: "Oops!",
            text: "Something went wrong, Please try again later.",
            type: "error",
            timer: 2000,
            showConfirmButton: true
          }, function () {
            SweetAlert.close();
            return false;
          });
        });
      };
    }
  });

