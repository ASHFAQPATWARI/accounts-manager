/**
 * Created by apatwari on 11/16/2015.
 */
accountsManagerServices.factory('transactionDetailService', function($cordovaSQLite, DBA, $q, stockItemService) {
  var self = this;

  /*self.all = function() {
    return DBA.query("SELECT id, categoryid, itemname, itemdesc, itemqty, itemprice FROM stockItem")
      .then(function(result){
        return DBA.getAll(result);
      });
  };*/

  /*self.get = function(memberId) {
    var parameters = [memberId];
    return DBA.query("SELECT id, categoryid, itemname, itemdesc, itemqty, itemprice FROM stockItem WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };*/

  self.getTransactionsByDate = function(date){
    var parameters = [date];
    return DBA.query("select transactions .total, transactions.due, transactionDetails .transactionId, transactionDetails .qty, transactionDetails.price, customer .name, stockCategory .category, stockItem .itemname from transactionDetails inner join transactions on transactionDetails.transactionId = transactions.id and transactions.date=(?) inner join customer on transactions.customerId = customer.id inner join stockCategory on transactionDetails.categoryId = stockCategory.id inner join stockItem on transactionDetails.itemId = stockItem.id", parameters)
      .then(function(result) {
        return DBA.getAll(result);
      });
  };

  //get transactions by customer Id
  self.getTransactionsByCustomerId = function(id){
    var parameters = [id];
    return DBA.query("select transactions .total,transactions .date, transactions .due, transactionDetails .transactionId, transactionDetails .qty, transactionDetails.price, stockCategory .category, stockItem .itemname from transactionDetails inner join transactions on transactionDetails.transactionId = transactions.id and transactions.customerId=(?) inner join stockCategory on transactionDetails.categoryId = stockCategory.id inner join stockItem on transactionDetails.itemId = stockItem.id", parameters)
      .then(function(result) {
        return DBA.getAll(result);
      });
  };

  self.add = function(item, transactionId) {
    var parameters = [transactionId, item.categoryId, item.itemId, item.qty, item.price];
    return DBA.query("INSERT INTO transactionDetails (transactionId, categoryId, itemId, qty, price) VALUES (?,?,?,?,?)", parameters)
      .then(function(result){
        return result;
      });
  };

  //this function will add transaction items one by one and also update qty in the stockItem table.
  self.addMultipleItems = function(transactionDetail, transactionId){
    var q = $q.defer();
    var count = 0;
    var totalItems = transactionDetail.length - 1;
    var callAdd = function(){
      var currentItem = transactionDetail[count];
      self.add(currentItem, transactionId).then(function(result){
        stockItemService.get(currentItem.itemId).then(function(result){
          var remainingQty = result.itemqty - currentItem.qty;
          stockItemService.updateQty(currentItem.itemId, remainingQty).then(function(){
            if(count < totalItems){
              count += 1;
              callAdd();
            } else {
              q.resolve("success");
            }
          });
        });
      });
    };
    //call once to start adding process
    callAdd();

    return q.promise;
  };

  /*self.remove = function(item) {
    var parameters = [item.id];
    return DBA.query("DELETE FROM stockItem WHERE id = (?)", parameters)
      .then(function(){
        console.log("item:", JSON.stringify(item));
        return stockCategoryService.getItemCount(item.categoryid)
          .then(function(result){
            console.log("item count", result.totalItems);
            return stockCategoryService.update(item.categoryid, result.totalItems - 1);
          });
      });
  };*/

  /*self.updateItem = function(item) {
    var parameters = [item.itemname, item.itemdesc, item.itemqty, item.itemprice, item.id];
    return DBA.query("UPDATE stockItem SET itemname = (?), itemdesc = (?), itemqty = (?), itemprice = (?) WHERE id = (?)", parameters);
  };*/

  return self;
});
