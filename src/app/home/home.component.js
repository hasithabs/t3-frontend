angular
  .module('app')
  .component('homeCom', {
    templateUrl: 'app/home/template/home.html',
    controller: function ($log, HomeSDK) {
      var self = this;

      // Call `getGreet` method in `HomeSDK` and catch the returned promise
      HomeSDK.getGreet().then(function (response) {
        self.hello = response.greet;
      }, function (error) {
        alert('Oops! Something went wrong. Please try again later');
        $log.error(error);
      });
      
    }
  });
