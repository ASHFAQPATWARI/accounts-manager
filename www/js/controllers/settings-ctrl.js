/**
 * Created by ashfaq on 20/12/15.
 */
accountsApp.controller('settingsCtrl', function($scope, $cordovaBarcodeScanner) {

  $scope.scan = function(){
    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        // Success! Barcode data is here
        $scope.data = JSON.stringify(barcodeData);
        alert(barcodeData);
      }, function(error) {
        // An error occurred
        alert("error");
      });
  }

});
