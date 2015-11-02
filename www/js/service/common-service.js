/**
 * Created by apatwari on 11/2/2015.
 */
accountsManagerServices.factory('commonService', function($ionicLoading) {
  var self = this;

  self.showLoading = function(){
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in'
    });
  };

  return self;
});
