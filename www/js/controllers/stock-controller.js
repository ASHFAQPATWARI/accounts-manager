/**
 * Created by apatwari on 10/28/2015.
 */
accountsApp.controller('stockCtrl', function($scope, toastService, $ionicModal, $ionicPopup, $timeout, stockCategoryService, stockItemService, commonService) {
  /*execute whenever view is loaded*/
  $scope.$on('$ionicView.beforeEnter', function() {
    commonService.showLoading();
    updateCategories();
  });

  var updateCategories = function() {
    stockCategoryService.all().then(function(categories){
      $scope.stockCategories = categories;
      commonService.hideLoading();
    }, function(){
      commonService.hideLoading();
    });
  };

  /*variables used in stock controller*/
  $scope.categoryObj = {};
  $scope.stockCategories = [];

  /*functions used in template*/
  $scope.createNewCategory = function(categoryObj){
    if($scope.categoryObj.category && $scope.categoryObj.category.trim() != ""){
      stockCategoryService.add($scope.categoryObj).then(function(){
        updateCategories();
        $scope.closeModal();
      });
    } else {
      toastService.showShortBottom("Please enter a Category name.");
    }
  };

  $scope.removeCategory = function(categoryId){
    stockCategoryService.remove(categoryId);
    updateCategories();
  };

  $scope.showOptions = function() {
    var optionPopup = $ionicPopup.show({
      title: 'Stock Entry',
      scope: $scope,
      buttons: [
        {
          text: '<i class="icon ion-android-add-circle">Category</i>',
          type: 'button-positive',
          onTap: function(e) {
            optionPopup.close();
            $timeout(function(){
              $scope.openModal();
            });
          }
        },
        /*{
          text: '<i class="icon ion-android-add-circle">Item</i>',
          type: 'button-calm',
          onTap: function(e) {
            optionPopup.close();
            $timeout(function(){
              updateCategories();
              $scope.openModal('item');
            });
          }
        },*/
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

  /*modal related functions*/

  //add category modal related functions
  $ionicModal.fromTemplateUrl('./templates/partials/add-category-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addCategoryModal = modal;
  });

  $scope.openModal = function() {
    $scope.addCategoryModal.show();
  };

  $scope.closeModal = function() {
    $scope.addCategoryModal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    //$scope.modal.remove();
  });

  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    $scope.categoryObj = {};
  });

  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

});
