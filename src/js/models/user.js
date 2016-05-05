var UserModel = (function() {
  function UserModel(options) {
    var defaults = {};
    this.opt = _.extend(defaults, options);
    this.init();
  }

  UserModel.prototype.init = function(){
    this.getCurrentUser();
  };

  UserModel.prototype.getCurrentUser = function(){
    var _this = this;

    $.getJSON(this.opt.base_url + '/sessions/current', function(resp) {
      console.log(resp);

      // user is logged in
      if (resp.status && resp.user) {
        _this.userData = resp.user;
        $.publish('users.auth.success', [resp.user, resp.message]);
      }

      // save token
      _this.token = resp.token;
    });
  };

  UserModel.prototype.getToken = function(){
    var _this = this;

    $.getJSON(this.opt.base_url + '/sessions/token', function(resp) {
      _this.token = resp.token;
    });
  };

  UserModel.prototype.isLoggedIn = function(){
    return this.userData;
  };

  UserModel.prototype.login = function(login, password){
    if (!this.token) return false;

    var _this = this,
        data = {login_string: login, login_pass: password, login_token: this.token};

    $.post(this.opt.base_url + '/sessions/create', data, function(resp){
      console.log(resp);

      // success
      if (resp.status) {
        _this.userData = resp.user;
        $.publish('users.login.success', [resp.user, resp.message]);

      // failure
      } else {
        $.publish('users.login.failure', resp.message);
      }

      _this.token = resp.token;

    },'json');
  };

  UserModel.prototype.logout = function(){
    var _this = this;

    $.post(this.opt.base_url + '/sessions/destroy', data, function(resp){
      console.log(resp);

      if (resp.token) {
        _this.token = resp.token;
      }

      $.publish('users.logout', resp.message);

    },'json');
  };

  return UserModel;

})();
