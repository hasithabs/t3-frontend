angular
  .module('app')
  .component('sampleCom', {
    templateUrl: 'app/sample/template/sample.html',
    controller: function ($log) {
      // var self = this;
      $log.log('sample loaded');
    }
  });
