var accountsApp = angular.module('accountsManager.controllers', []);

accountsApp.controller('customerCtrl', function($scope, customer, $ionicModal, $ionicPopup, $timeout) {
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
                    type: 'button-positive',
                    onTap: function(e) {
                        optionPopup.close();
                        $timeout(function(){
                            $scope.openModal();
                        });
                    }
                },
                {
                  text: 'Cancel',
                  type: 'button-assertive',
                  onTap: function(e) {
                    optionPopup.close();
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
});
