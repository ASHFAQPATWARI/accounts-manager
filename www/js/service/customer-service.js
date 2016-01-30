accountsManagerServices.factory('customer', function($cordovaSQLite, DBA) {
  var self = this;

  self.all = function() {
    return DBA.query("SELECT id, name, shopName, area, country, mobile, landline FROM customer where status=1 order by name")
      .then(function(result){
        return DBA.getAll(result);
      });
  };

  self.get = function(memberId) {
    var parameters = [memberId];
    return DBA.query("SELECT id, name, shopName, area, country, mobile, landline FROM customer WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };

  self.add = function(member) {
    var parameters = [member.name, member.shopName, member.area, member.country, member.mobile, member.landline];
    return DBA.query("INSERT INTO customer ( name, shopName, area, country, mobile, landline) VALUES (?,?,?,?,?,?)", parameters);
  };

  self.remove = function(member) {
    var parameters = [member.id];
    return DBA.query("UPDATE customer SET status = 0 WHERE id = (?)", parameters);
  };

  self.update = function(origMember, editMember) {
    var parameters = [editMember.id, editMember.name, origMember.id];
    return DBA.query("UPDATE customer SET id = (?), name = (?) WHERE id = (?)", parameters);
  };

  self.getCustomersForTransaction = function() {
    return DBA.query("SELECT id, name FROM customer WHERE status=1")
      .then(function(result){
        return DBA.getAll(result);
      });
  };

  return self;
});
