/**
 * Created by apatwari on 10/26/2015.
 */
accountsManagerServices.factory('loginService', function($cordovaSQLite, DBA) {
  var self = this;

  self.get = function(id) {
    var parameters = [id];
    return DBA.query("SELECT username, password FROM user WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };

  self.getCount = function(){
    var parameters = [];
    return DBA.query("SELECT count(*) FROM user", parameters)
      .then(function(result) {
        return DBA.getAll(result);
      });
  };

  self.add = function(member) {
    var parameters = [member.username, member.password];
    return DBA.query("INSERT INTO user ( username, password) VALUES (?,?)", parameters);
  };

  // to-do: update password and delete user options.
  /*self.remove = function(member) {
    var parameters = [member.id];
    return DBA.query("DELETE FROM customer WHERE id = (?)", parameters);
  };

  self.update = function(origMember, editMember) {
    var parameters = [editMember.id, editMember.name, origMember.id];
    return DBA.query("UPDATE customer SET id = (?), name = (?) WHERE id = (?)", parameters);
  };*/

  return self;
});
