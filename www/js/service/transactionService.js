/**
 * Created by apatwari on 11/16/2015.
 */
accountsManagerServices.factory('transactionService', function($cordovaSQLite, DBA, stockCategoryService) {
  var self = this;

  //$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS transactionDetails;");
  //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS transactionDetails (id integer primary key AUTOINCREMENT, transactionId integer, categoryId integer, itemId integer, qty integer, price REAL)");
  //$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS transactions;");
  //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS transactions (id integer primary key AUTOINCREMENT, customerId integer, date text)");

  self.all = function() {
    return DBA.query("SELECT id, categoryid, itemname, itemdesc, itemqty, itemprice FROM stockItem")
      .then(function(result){
        return DBA.getAll(result);
      });
  };

  self.get = function(memberId) {
    var parameters = [memberId];
    return DBA.query("SELECT id, categoryid, itemname, itemdesc, itemqty, itemprice FROM stockItem WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };

  self.add = function(transaction) {
    var parameters = [transaction.customerId, transaction.date];
    return DBA.query("INSERT INTO transactions (customerId, date) VALUES (?,?)", parameters)
      .then(function(result){
        return DBA.query("SELECT last_insert_rowid()", null)
          .then(function(result){
            return DBA.getById(result);
          });
      });
  };

  self.remove = function(item) {
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
  };

  self.getItemsByCategoryId = function(categoryid){
    var parameters = [categoryid];
    return DBA.query("SELECT id, categoryid, itemname, itemdesc, itemqty, itemprice FROM stockItem WHERE categoryid = (?)", parameters)
      .then(function(result){
        return DBA.getAll(result);
      });
  };

  self.updateItem = function(item) {
    var parameters = [item.itemname, item.itemdesc, item.itemqty, item.itemprice, item.id];
    return DBA.query("UPDATE stockItem SET itemname = (?), itemdesc = (?), itemqty = (?), itemprice = (?) WHERE id = (?)", parameters);
  };

  return self;
});
