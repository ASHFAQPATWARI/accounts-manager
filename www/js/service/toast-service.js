/**
 * Created by apatwari on 10/27/2015.
 */
accountsManagerServices.factory('toastService', function($cordovaToast) {
  var self = this;

  self.showShortBottom = function(message) {
    $cordovaToast.showShortBottom(message).then(function(success) {
      //success
    }, function (error) {
      // error
    });
  };

  return self;
});
