angular
  .module('app')
  .component('checkoutCom', {
    templateUrl: 'app/checkout/template/checkout.html',
    controller: function ($log, $q, FareCalculationSDK, SweetAlert, moment, Notification, localStorageService) {
      var self = this;

      self.dateNow = moment().format('h:mm:ss - MMMM Do YYYY');;

      self.checkoutSubmitBtnClicked = false;
      self.isCardValid = false;
      self.isDestinationKnow = false;

      self.busId = 1;
      self.routeId = 1;
      self.tripId = 1;
      self.cardId = 123456;

      self.checkinLocatin = localStorageService.get("t3checkin-" + self.cardId);
      console.log(self.checkinLocatin);
      self.checkoutLocatin = "Rajagiriya Bus Station";

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
       * Gets the trip details.
       *
       * @return     {object}  The trip details.
       */
      function getTripDetails() {
        var deferred = $q.defer();
        FareCalculationSDK.getTrip(self.tripId).then(function (response) {
          self.routeTripDetails = response.content[0];
          $log.log("*********self.routeTripDetails********");
          $log.log(self.routeTripDetails);
          deferred.resolve(response.content);

          /* eslint-disable */
          self.travelRate = self.routeTripDetails.rate_per_km;
          /* eslint-enable */
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
          self.availableBalance = self.cardDetails.balance;
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
       * Gets the card details.
       *
       * @param      {int}  cardId  The card identifier
       */
      function updateCardDetails(cardObj) {
        var deferred = $q.defer();
        FareCalculationSDK.updateCard(cardObj).then(function (response) {
          Notification.success("Trip fee deduct successfully");
          self.isCardValid = true;

          self.cardDetails = response.content;
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
      getTripDetails();

      /**
       * Passenger Check Out
       */
      self.onCheckOutClicked = function () {
        self.checkoutSubmitBtnClicked = true;
        self.dateNow = moment().format('h:mm:ss - MMMM Do YYYY');;

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

            getGoogleMapDetails(self.checkinLocatin, self.checkoutLocatin).then(function (response) {
              self.tripFee = ((self.tripDistance.value / 1000) * self.travelRate);
              cardItem.balance -= self.tripFee;

              var updateCardObj = {
                card_number: cardItem.card_number,
                account_number: cardItem.account_number,
                activation_date: cardItem.activation_date,
                expiry_date: cardItem.expiry_date,
                status: cardItem.status,
                balance: cardItem.balance,
                type: cardItem.type
              };
              updateCardDetails(updateCardObj);
            }, function (error) {
              Notification.error("We can't find your trip locations. Please try again");
            })
          }
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

