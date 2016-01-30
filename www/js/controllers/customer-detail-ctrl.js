/**
 * Created by ashfaq on 5/12/15.
 */
accountsApp.controller('customerDetailCtrl', function($scope, $stateParams, customer, transactionDetailService, commonService) {

  $scope.$on('$ionicView.beforeEnter', function() {
    commonService.showLoading();
    getCustomerDetails();
  });

  $scope.transactionList = {};

  var getCustomerDetails = function(){
    customer.get($stateParams.customerId).then(function(result){
      $scope.customerInfo = result;
      commonService.hideLoading();
    }, function(){
      commonService.hideLoading();
    });
    transactionDetailService.getTransactionsByCustomerId($stateParams.customerId).then(function(result){
      $scope.transactionList = _.groupBy(result, function(transaction){
        return transaction.transactionId;
      });
      commonService.hideLoading();
    }, function(){
      commonService.hideLoading();
    });
  };

});
