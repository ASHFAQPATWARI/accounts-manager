/**
 * Created by ashfaq on 28/11/15.
 */
accountsApp.controller('transactionDetailCtrl', function($scope, $stateParams, transactionDetailService, commonService) {

  $scope.$on('$ionicView.beforeEnter', function() {
    commonService.showLoading();
    updateTransactions();
  });

  $scope.transactionList = [];
  $scope.selectedDate = $stateParams.transactionDate;

  var updateTransactions = function(){
    transactionDetailService.getTransactionsByDate($stateParams.transactionDate).then(function(result){
      $scope.transactionList = _.groupBy(result, function(transaction){
        return transaction.transactionId;
      });
      console.log("transaction list", $scope.transactionList);
      commonService.hideLoading();
    }, function(){
      commonService.hideLoading();
    });
  };

});
