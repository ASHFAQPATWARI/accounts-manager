/**
 * Created by apatwari on 10/29/2015.
 */
accountsManagerServices.factory('stockCategoryService', function($cordovaSQLite, DBA) {
  var self = this;

  self.all = function() {
    return DBA.query("SELECT id, category, totalItems FROM stockCategory")
      .then(function(result){
        return DBA.getAll(result);
      });
  };

  self.get = function(memberId) {
    var parameters = [memberId];
    return DBA.query("SELECT id, category, totalItems FROM stockCategory WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };

  self.add = function(member) {
    var parameters = [member.category];
    return DBA.query("INSERT INTO stockCategory (category) VALUES (?)", parameters);
  };

  self.remove = function(id) {
    var parameters = [id];
    return DBA.query("DELETE FROM stockCategory WHERE id = (?)", parameters);
  };

  self.update = function(id, totalItems) {
    var parameters = [totalItems, id];
    return DBA.query("UPDATE stockCategory SET totalItems = (?) WHERE id = (?)", parameters);
  };

  self.getItemCount = function(id) {
    var parameters = [id];
    return DBA.query("SELECT totalItems FROM stockCategory WHERE id = (?)", parameters)
      .then(function (result) {
        return DBA.getById(result);
      })
  };

  return self;
});
