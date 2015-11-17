/**
 * Created by apatwari on 11/16/2015.
 */
accountsManagerServices.factory('transactionDetailService', function($cordovaSQLite, DBA, $q, stockItemService) {
  var self = this;

  //$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS transactionDetails;");
  //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS transactionDetails (id integer primary key AUTOINCREMENT, transactionId integer, categoryId integer, itemId integer, qty integer, price REAL)");
  //$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS transactions;");
  //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS transactions (id integer primary key AUTOINCREMENT, customerId integer, date text)");

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

  self.add = function(item, transactionId) {
    var parameters = [transactionId, item.categoryId, item.itemId, item.qty, item.price];
    return DBA.query("INSERT INTO transactionDetails (transactionId, categoryId, itemId, qty, price) VALUES (?,?,?,?,?)", parameters)
      .then(function(result){
        return result;
      });
  };

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
