angular
  .module('app')
  .component('checkinCom', {
    templateUrl: 'app/checkin/template/checkin.html',
    controller: function ($log, $q, FareCalculationSDK, moment) {
      var self = this;

      self.checkinSubmitBtnClicked = false;
      self.isCardValid = false;

      self.travelMode = "DRIVING";
      self.wayPoints = [
      {
        location: {
          lat: 44.32384807250689,
          lng: -78.079833984375
        },
        stopover: true
      }, {
        location: {
          lat: 44.55916341529184,
          lng: -76.17919921875
        },
        stopover: true
      }];
      self.origin = "Kandy-Colombo Intercity Bus Station";
      self.destination = "Colombo Central Bus Stand";


      self.cardId = 123456;
      /**
       * Passenger Check In
       */
      self.onCheckInClicked = function () {
        self.checkinSubmitBtnClicked = true;
        getCardDetails(self.cardId).then(function (cardItem) {
          if (cardItem.status === "active") {

          }
          console.log(cardItem);
          console.log(cardItem.expiry_date);
          console.log(moment(cardItem.expiry_date));
          console.log(moment().diff(cardItem.expiry_date, 'days'));
        }, function (error) {

        });
      };

      /**
       * Gets the card details.
       *
       * @param      {int}  cardId  The card identifier
       */
      function getCardDetails(cardId) {
        var deferred = $q.defer();
        FareCalculationSDK.getCards(cardId).then(function (response) {
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
    }
  });

