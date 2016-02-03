/**
 * Created by apatwari on 10/29/2015.
 */
accountsManagerServices.factory('stockItemService', function($cordovaSQLite, DBA, stockCategoryService) {
  var self = this;

  self.all = function() {
    return DBA.query("SELECT id, categoryid, itemname, itemdesc, itemqty, itemprice FROM stockItem where status=1")
      .then(function(result){
        return DBA.getAll(result);
      });
  };

  self.get = function(id) {
    var parameters = [id];
    return DBA.query("SELECT id, categoryid, itemname, itemdesc, itemqty, itemprice FROM stockItem WHERE id = (?) AND status=1", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };

  self.getByBarcode = function(code) {
    var parameters = [code];
    return DBA.query("SELECT stockItem.itemname, stockItem.itemdesc, stockItem.itemqty, stockItem.itemprice, stockCategory.category FROM stockItem inner join stockCategory on stockItem.categoryid=stockCategory.id and barcode = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };

  self.add = function(member) {
    var parameters = [member.categoryid, member.itemname, member.itemdesc, member.itemqty, member.itemprice, member.barcode];
    return DBA.query("INSERT INTO stockItem (categoryid, itemname, itemdesc, itemqty, itemprice, barcode) VALUES (?,?,?,?,?,?)", parameters)
      .then(function(){
        return stockCategoryService.getItemCount(member.categoryid)
          .then(function(result){
            return stockCategoryService.update(member.categoryid, result.totalItems + 1);
          });
      });
  };

  self.remove = function(item) {
    var parameters = [item.id];
    return DBA.query("UPDATE stockItem SET status=0 WHERE id = (?)", parameters)
      .then(function(){
        return stockCategoryService.getItemCount(item.categoryid)
          .then(function(result){
            return stockCategoryService.update(item.categoryid, result.totalItems - 1);
          });
      });
  };

  self.getItemsByCategoryId = function(categoryid){
    var parameters = [categoryid];
    return DBA.query("SELECT id, categoryid, itemname, itemdesc, itemqty, itemprice FROM stockItem WHERE categoryid = (?) and status=1", parameters)
      .then(function(result){
        return DBA.getAll(result);
      });
  };

  self.updateItem = function(item) {
    var parameters = [item.itemname, item.itemdesc, item.itemqty, item.itemprice, item.id];
    return DBA.query("UPDATE stockItem SET itemname = (?), itemdesc = (?), itemqty = (?), itemprice = (?) WHERE id = (?)", parameters);
  };

  self.updateQty = function(id, qty) {
    var parameters = [qty, id];
    return DBA.query("UPDATE stockItem SET itemqty = (?) WHERE id = (?)", parameters);
  };

  return self;
});
