/**
 * Created by apatwari on 10/26/2015.
 */
accountsApp.controller('loginCtrl', function($scope, loginService) {
  $scope.showLogin = false;
  $scope.user = {};
  $scope.confirmPassword = {};

  loginService.get(1).then(function(user){
    console.log("user:", user);
    $scope.showLogin = true;
  });

  $scope.addUser = function(){
    if($scope.user.password == $scope.confirmPassword.password){
      loginService.add($scope.user).then(function(){
        console.log("user added");
      })
    } else {
      console.log("passwords are not correct");
    }
  };

});
