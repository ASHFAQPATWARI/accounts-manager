/**
 * Created by ashfaq on 10/11/15.
 */
accountsApp.controller('accountsCtrl', function($scope, toastService, $ionicModal, $ionicPopup, $timeout, stockCategoryService, stockItemService, commonService, customer) {

  //variable for handling customers, categories list.Initially declared null
  $scope.customers = null;
  $scope.categories = null;
  $scope.itemList = [];

  //transaction obj which will have transaction details
  $scope.transactionObj = {
    customerId: null,
    transactionDetail: [],
    date: null
  };

  //temp obj to hold single transaction detail which will be combined into transactionObj
  $scope.tempTransactionObj = {
    categoryId : null,
    itemId: null,
    qty: null,
    price: null
  };

  /*watch for category changes to update items list*/
  $scope.$watch('tempTransactionObj.categoryId', function(newVal, oldVal){
    if(newVal != oldVal){
      commonService.showLoading();
      stockItemService.getItemsByCategoryId(newVal).then(function(result){
        $scope.itemList = result;
        commonService.hideLoading();
      }, function(){
        commonService.hideLoading();
      });
    }
  });

  $scope.createTransaction = function(valid){
    if(valid){

    } else {
      toastService.showShortBottom("Please fill in all the required transaction details.");
    }
  };

  $scope.showOptions = function() {
    var optionPopup = $ionicPopup.show({
      title: 'Stock Entry',
      scope: $scope,
      buttons: [
        {
          text: '<i class="icon ion-android-add-circle">Transaction</i>',
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

  $ionicModal.fromTemplateUrl('./templates/partials/add-transaction-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addTransactionModal = modal;
  });

  $scope.openModal = function() {
    commonService.showLoading();
    if($scope.customers == null){
      customer.getCustomersForTransaction().then(function(customers){
        $scope.customers = customers;
        stockCategoryService.all().then(function(categories){
          $scope.categories = categories;
          commonService.hideLoading();
        });
      });
    }
    $scope.addTransactionModal.show();
  };

  $scope.closeModal = function() {
    $scope.addTransactionModal.hide();
  };

});