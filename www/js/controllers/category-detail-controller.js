/**
 * Created by apatwari on 11/2/2015.
 */
/**
 * Created by apatwari on 10/28/2015.
 */
accountsApp.controller('categoryDetailCtrl', function($scope, $cordovaBarcodeScanner, toastService, $ionicModal, $ionicPopup, $timeout, stockCategoryService, stockItemService, $stateParams, commonService) {

  /*execute on view load everytime*/
  $scope.$on('$ionicView.beforeEnter', function() {
    getItemsList();
  });

  /*variables for template use*/
  $scope.itemList = [];
  $scope.itemObj = {
    categoryid: $stateParams.categoryId
  };
  $scope.categoryObj = {};
  $scope.editItemObj = {};

  /*default calls on view load*/
  var getItemsList = function(){
    commonService.showLoading();
    stockItemService.getItemsByCategoryId($stateParams.categoryId).then(function(result){
      $scope.itemList = result;
      commonService.hideLoading();
    }, function(){
      commonService.hideLoading();
    });
  };

  stockCategoryService.get($stateParams.categoryId).then(function(result){
    $scope.categoryObj = result;
  });

  $scope.updateItemModal = function (item) {
    $scope.editItemObj = item;
    $scope.openModal();
  };

  $scope.deleteItem = function (item) {
    stockItemService.remove(item);
    getItemsList();
  };

  $scope.scan = function(){
    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        // Success! Barcode data is here
        $scope.itemObj.barcode = barcodeData.text;
        alert(JSON.stringify(barcodeData));
      }, function(error) {
        // An error occurred
        alert("error");
      });
  };

  $scope.createNewItem = function(isValid){
    if(isValid){
      stockItemService.add($scope.itemObj).then(function(){
        $scope.closeAddModal();
        getItemsList();
      });
    }else {
      toastService.showShortBottom("Please fill in all the required item details.");
    }
  };

  $scope.editItem = function(isValid){
    if(isValid){
      stockItemService.updateItem($scope.editItemObj);
      getItemsList();
      $scope.closeModal();
    } else {
      toastService.showShortBottom("Please fill in all the required item details.");
    }
  };

  $scope.showOptions = function() {
    var optionPopup = $ionicPopup.show({
      title: 'Stock Entry',
      scope: $scope,
      buttons: [
        {
         text: '<i class="icon ion-android-add-circle"></i>',
         type: 'button-calm',
         onTap: function(e) {
           optionPopup.close();
           $timeout(function(){
            $scope.openAddModal();
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

  //add item modal related functions
  $ionicModal.fromTemplateUrl('./templates/partials/add-item-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addItemModal = modal;
  });

  /*modal declaration nd functions*/
  $ionicModal.fromTemplateUrl('./templates/partials/edit-item-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.editItemModal = modal;
  });

  $scope.openAddModal = function(){
    $scope.addItemModal.show();
  };

  $scope.openModal = function() {
    $scope.editItemModal.show();
  };

  $scope.closeModal = function() {
    $scope.editItemModal.hide();
  };

  $scope.closeAddModal = function() {
    $scope.addItemModal.hide();
  };

  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    $scope.itemObj = {
        categoryid: $stateParams.categoryId
    };
  });

});
