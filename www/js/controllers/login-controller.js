/**
 * Created by apatwari on 10/26/2015.
 */
accountsApp.controller('loginCtrl', function($scope, loginService, $cordovaToast, $state, $ionicHistory, toastService) {
  $scope.showLogin = false;
  $scope.user = {};
  $scope.confirmPassword = {};

  loginService.getCount().then(function(result){
    if(result[0]["count(*)"] == 0)
      $scope.showLogin = false;
    else
      $scope.showLogin = true;
  });

  $scope.authUser = function(){
    if($scope.user.username && $scope.user.username.trim() != ""){
      loginService.get(1).then(function(data){
        if($scope.user.username == data.username && $scope.user.password == data.password){
          $ionicHistory.currentView($ionicHistory.backView());
          $state.go('tab.customers', {location: 'replace'});
        } else {
          toastService.showShortBottom('Username or Password is not correct.');
          $scope.user.password = "";
        }
      });
    } else {
      toastService.showShortBottom('Please enter User Name.');
    }
  };

  $scope.addUser = function(){
    if($scope.user.username && $scope.user.username.trim() != ""){
      if( $scope.user.password || $scope.confirmPassword.password){
        if($scope.user.password == $scope.confirmPassword.password){
          loginService.add($scope.user).then(function(){
            $ionicHistory.currentView($ionicHistory.backView());
            $state.go('tab.customers', {location: 'replace'});
          })
        } else {
          toastService.showShortBottom('Passwords do not Match.');
          $scope.user.password = $scope.confirmPassword.password = "";
        }
      } else {
        toastService.showShortBottom('Please enter both the passwords.');
        $scope.user.password = $scope.confirmPassword.password = "";
      }
    } else {
      toastService.showShortBottom('Please enter a User-Name.');
    }
  };

});
