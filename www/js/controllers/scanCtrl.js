/**
 * Created by ashfaq on 21/12/15.
 */
accountsApp.controller('scanCtrl', function($scope, $cordovaBarcodeScanner, stockItemService) {

    $scope.item = undefined;

  $scope.scan = function(){
    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        // Success! Barcode data is here
        $scope.data = JSON.stringify(barcodeData.text);
        alert($scope.data);
        stockItemService.getByBarcode(barcodeData.text).then(function(result){
          $scope.item = result;
        });
      }, function(error) {
        // An error occurred
        alert("error");
      });
  };

});
