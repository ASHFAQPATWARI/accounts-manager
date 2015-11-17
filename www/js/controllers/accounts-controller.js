/**
 * Created by ashfaq on 10/11/15.
 */
accountsApp.controller('accountsCtrl', function($scope, toastService, $ionicModal, $ionicPopup, $timeout, stockCategoryService, stockItemService, transactionService, transactionDetailService, commonService, customer, $cordovaDatePicker) {

  //variable for handling customers, categories list.Initially declared null
  $scope.customers = null;
  $scope.categories = null;
  $scope.itemList = [];

  var options = {
    date: new Date(),
    mode: 'date', // or 'time'
    //minDate: new Date() - 10000,
    allowOldDates: true,
    allowFutureDates: false,
    doneButtonLabel: 'DONE',
    doneButtonColor: '#F2F3F4',
    cancelButtonLabel: 'CANCEL',
    cancelButtonColor: '#000000'
  };

  $scope.openDatePicker = function(){
    $cordovaDatePicker.show(options).then(function(date){
      $scope.transactionObj.date = moment(date).format('L');
    });
  };

  //transaction obj which will have transaction details
  $scope.transactionObj = {
    customerId: "",
    transactionDetail: [],
    date: moment().format('L')
  };

  //schema of temp transaction object
  var schemaTransactionItem = {
    categoryId : "",
    itemId: "",
    itemName: '',
    qty: null,
    price: null
  };

  //temp obj to hold single transaction detail which will be combined into transactionObj
  $scope.tempTransactionObj = angular.copy(schemaTransactionItem);

  /*watch for category changes to update items list*/
  $scope.$watch('tempTransactionObj.categoryId', function(newVal, oldVal){
    if(newVal){
      if(newVal != oldVal){
        commonService.showLoading();
        stockItemService.getItemsByCategoryId(newVal).then(function(result){
          $scope.itemList = result;
          commonService.hideLoading();
        }, function(){
          commonService.hideLoading();
        });
      }
    } else {
      $scope.tempTransactionObj = angular.copy(schemaTransactionItem);
      $scope.selectedItemQty = null;
    }
  });

  /*watch for item changes*/
  $scope.$watch('tempTransactionObj.itemId', function(newVal, oldVal){
    if(newVal != oldVal){
      if(newVal){
        var selectedItem = _.find($scope.itemList, function(item){
          return item.id == newVal;
        });
        $scope.selectedItemQty = $scope.tempTransactionObj.qty = selectedItem.itemqty;
        $scope.tempTransactionObj.price = selectedItem.itemprice;
        $scope.tempTransactionObj.itemName = selectedItem.itemname;
      }
    }
  });

  $scope.AddItemInTransaction = function(){
    if($scope.tempTransactionObj.itemId){
      if($scope.tempTransactionObj.qty <= $scope.selectedItemQty){
        var itemAlreadyExist = _.find($scope.transactionObj.transactionDetail, function(item){
          return item.itemId == $scope.tempTransactionObj.itemId;
        });
        if(!itemAlreadyExist){
          $scope.transactionObj.transactionDetail.push($scope.tempTransactionObj);
          $scope.tempTransactionObj = angular.copy(schemaTransactionItem);
        } else {
          toastService.showShortBottom("Item already added. Please choose another Item.");
        }
      } else {
        toastService.showShortBottom("Quantity cannot be greater than available quantity.");
      }
    } else {
      toastService.showShortBottom("Please select item to add.");
    }
  };

  $scope.removeTransactionItem = function(index){
    $scope.transactionObj.transactionDetail.splice(index, 1);
  };

  $scope.createTransaction = function(valid){
    if(valid && $scope.transactionObj.transactionDetail.length){
      commonService.showLoading();
      transactionService.add({ customerId: $scope.transactionObj.customerId , date: $scope.transactionObj.date}).then(function(transactionId){
        transactionDetailService.addMultipleItems($scope.transactionObj.transactionDetail, transactionId).then(function(result){
          if(result == "success"){
            commonService.hideLoading();
            $scope.closeModal();
            toastService.showShortBottom("Transaction Added Successfully.");
          }
        });
      });
    } else {
      toastService.showShortBottom("Please fill in all the required transaction details.");
    }
  };

  $scope.showOptions = function() {
    var optionPopup = $ionicPopup.show({
      title: 'Transaction',
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

  $ionicModal.fromTemplateUrl('./templates/partials/add-transaction-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addTransactionModal = modal;
  });

  $scope.openModal = function() {
    commonService.showLoading();
    customer.getCustomersForTransaction().then(function(customers){
      $scope.customers = customers;
      stockCategoryService.all().then(function(categories){
        $scope.categories = categories;
        commonService.hideLoading();
      });
    });
    $scope.addTransactionModal.show();
  };

  $scope.closeModal = function() {
    $scope.addTransactionModal.hide();
  };

  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    $scope.transactionObj = {
      customerId: null,
      transactionDetail: [],
      date: moment().format('L')
    };
    $scope.tempTransactionObj = angular.copy(schemaTransactionItem);
  });

});
