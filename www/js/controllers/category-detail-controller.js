/**
 * Created by apatwari on 11/2/2015.
 */
/**
 * Created by apatwari on 10/28/2015.
 */
accountsApp.controller('categoryDetailCtrl', function($scope, toastService, $ionicModal, $ionicPopup, $timeout, stockCategoryService, stockItemService, $stateParams, commonService) {

  /*execute on view load everytime*/
  $scope.$on('$ionicView.enter', function() {
    //commonService.showLoading();
    getItemsList();
  });

  /*variables for template use*/
  $scope.itemList = [];
  $scope.categoryObj = {};
  $scope.editItemObj = {};

  /*default calls on view load*/
  var getItemsList = function(){
    stockItemService.getItemsByCategoryId($stateParams.categoryId).then(function(result){
      $scope.itemList = result;
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

  $scope.editItem = function(isValid){
    if(isValid){
      stockItemService.updateItem($scope.editItemObj);
      getItemsList();
      $scope.closeModal();
    } else {
      toastService.showShortBottom("Please fill in all the required item details.");
    }
  };

  /*modal declaration nd functions*/
  $ionicModal.fromTemplateUrl('./templates/partials/edit-item-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.editItemModal = modal;
  });

  $scope.openModal = function() {
    $scope.editItemModal.show();
  };

  $scope.closeModal = function() {
    $scope.editItemModal.hide();
  };

});
