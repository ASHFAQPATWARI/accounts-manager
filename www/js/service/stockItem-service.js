/**
 * Created by apatwari on 10/29/2015.
 */
accountsManagerServices.factory('stockItemService', function($cordovaSQLite, DBA, stockCategoryService) {
  var self = this;
//$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS stockItem (id integer primary key AUTOINCREMENT, categoryid integer,
// itemname text, itemdesc text, itemqty integer DEFAULT 0, itemprice REAL DEFAULT 0)");
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

  self.add = function(member) {
    var parameters = [member.categoryid, member.itemname, member.itemdesc, member.itemqty, member.itemprice];
    return DBA.query("INSERT INTO stockItem (categoryid, itemname, itemdesc, itemqty, itemprice) VALUES (?,?,?,?,?)", parameters)
      .then(function(){
        return stockCategoryService.getItemCount(member.categoryid)
          .then(function(result){
            return stockCategoryService.update(member.categoryid, result.totalItems + 1);
          });
      });
  };

  self.remove = function(id) {
    var parameters = [id];
    return DBA.query("DELETE FROM stockItem WHERE id = (?)", parameters);
  };

  self.getItemsByCategoryId = function(categoryid){
    var parameters = [categoryid];
    return DBA.query("SELECT id, categoryid, itemname, itemdesc, itemqty, itemprice FROM stockItem WHERE categoryid = (?)", parameters)
      .then(function(result){
        return DBA.getAll(result);
      });
  };

  return self;
});
