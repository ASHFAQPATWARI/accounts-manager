angular.module('accountsManager.controllers', [])

.controller('customerCtrl', function($scope, customer) {
    $scope.customers = [];
    $scope.customers = null;
    var customerFake = {
        id: 1,
        name: "Ahmad Jawda",
        shopName: "Reliable Stores",
        area: "Sharq",
        country: "Kuwait",
        mobile: "7200381711",
        landline: "96692952"
    };
    $scope.updateCustomer = function() {
      customer.all().then(function(customers){
        $scope.customers = customers;
      });
    };

    $scope.updateCustomer();

    $scope.createNewCustomer = function(member) {
      customer.add(member);
      $scope.updateCustomer();
    };

    $scope.createNewCustomer(customerFake);

    $scope.removeMember = function(member) {
      customer.remove(member);
      $scope.updateCustomer();
    };

    $scope.editMember = function(origMember, editMember) {
      customer.update(origMember, editMember);
      $scope.updateCustomer();
    };
})

.controller('accountsCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  /*$scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };*/
})

/*.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})*/

.controller('stockCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
