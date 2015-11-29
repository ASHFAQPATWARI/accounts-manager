/**
 * Created by apatwari on 11/16/2015.
 */
accountsManagerServices.factory('transactionService', function($cordovaSQLite, DBA, stockCategoryService) {
  var self = this;

  /*self.get = function(memberId) {
    var parameters = [memberId];
    return DBA.query("SELECT id, categoryid, itemname, itemdesc, itemqty, itemprice FROM stockItem WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };*/

  self.all = function() {
    //"select transactions .id,transactions .total, transactions .date, customer .name from transactions left join customer where transactions.customerId = customer.id"
    return DBA.query("select id, count(*) as count, date from transactions group by date order by date DESC")
      .then(function(result){
        return DBA.getAll(result);
      });
  };

  self.add = function(transaction) {
    var parameters = [transaction.customerId, transaction.date, transaction.total];
    return DBA.query("INSERT INTO transactions (customerId, date, total) VALUES (?,?,?)", parameters)
      .then(function(result){
        return result.insertId;
      });
  };

  /*self.remove = function(item) {
    var parameters = [item.id];
    return DBA.query("DELETE FROM stockItem WHERE id = (?)", parameters)
      .then(function(){
        return stockCategoryService.getItemCount(item.categoryid)
          .then(function(result){
            return stockCategoryService.update(item.categoryid, result.totalItems - 1);
          });
      });
  };*/

  /*self.getItemsByCategoryId = function(categoryid){
    var parameters = [categoryid];
    return DBA.query("SELECT id, categoryid, itemname, itemdesc, itemqty, itemprice FROM stockItem WHERE categoryid = (?)", parameters)
      .then(function(result){
        return DBA.getAll(result);
      });
  };*/

  /*self.updateItem = function(item) {
    var parameters = [item.itemname, item.itemdesc, item.itemqty, item.itemprice, item.id];
    return DBA.query("UPDATE stockItem SET itemname = (?), itemdesc = (?), itemqty = (?), itemprice = (?) WHERE id = (?)", parameters);
  };*/

  return self;
});
