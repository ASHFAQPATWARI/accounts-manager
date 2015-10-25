angular.module('accountsManager.controllers', [])

.controller('customerCtrl', function($scope, customer, $ionicModal, $ionicPopup, $timeout) {
    $scope.customers = [];
    $scope.customers = null;
    $scope.customerObj = {};

    $scope.updateCustomer = function() {
      customer.all().then(function(customers){
        $scope.customers = customers;
      });
    };

    $scope.updateCustomer();

    $scope.createNewCustomer = function(member, close) {
      console.log("new customer info", member);
      customer.add(member);
      $scope.updateCustomer();
      if(close){
        $scope.closeModal();
      }
    };

    //$scope.createNewCustomer(customerFake);

    $scope.removeCustomer = function(member) {
      customer.remove(member);
      $scope.updateCustomer();
    };

    $scope.editMember = function(origMember, editMember) {
      customer.update(origMember, editMember);
      $scope.updateCustomer();
    };

    //template functions
    $scope.showOptions = function() {
        var optionPopup = $ionicPopup.show({
            title: 'Add Customer',
            scope: $scope,
            buttons: [
                {
                    text: '<i class="icon ion-android-add-circle"></i>',
                    type: 'button-calm',
                    onTap: function(e) {
                        optionPopup.close();
                        $timeout(function(){
                            $scope.openModal();
                        });
                    }
                }
            ]
        });

        optionPopup.then(function(res) {
            optionPopup.close();
        });
    };

    //modal related functions
    $ionicModal.fromTemplateUrl('./templates/partials/customer-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        //$scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        $scope.customerObj = {};
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

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
