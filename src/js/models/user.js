var UserModel = (function() {
  function UserModel(props) {
    var defaults = {};
    this.props = _.extend(defaults, props);
    this.init();
  }

  UserModel.prototype.init = function(){
    this.getCurrentUser();
  };

  UserModel.prototype.forgot = function(email){
    var _this = this,
        data = {email: email};

    $.post(this.props.base_url + '/users/forgot_password', data, function(resp){
      console.log(resp);

      // success
      if (resp.status) {
        $.publish('users.forgot.success', resp.message);

      // failure
      } else {
        $.publish('users.forgot.failure', resp.message);
      }

    },'json');
  };

  UserModel.prototype.getCurrentUser = function(){
    var _this = this;

    $.getJSON(this.props.base_url + '/sessions/current', function(resp) {
      console.log(resp);

      // user is logged in
      if (resp.status && resp.user) {
        _this.userData = resp.user;
        $.publish('users.auth.success', [resp.user, resp.message]);
        $.publish('users.refresh', resp.user);
      }
    });
  };

  UserModel.prototype.getUserData = function(){
    return this.userData;
  };

  UserModel.prototype.isLoggedIn = function(){
    return this.getUserData();
  };

  UserModel.prototype.reset = function(pass, code){

    var _this = this,
        data = {pass: pass, code: code};

    $.post(this.props.base_url + '/users/reset_password', data, function(resp){
      console.log(resp);

      // success
      if (resp.status) {
        _this.userData = resp.user;
        $.publish('users.reset.success', [resp.user, resp.message]);
        $.publish('users.refresh', resp.user);

      // failure
      } else {
        $.publish('users.reset.failure', resp.message);
      }

    },'json');
  };

  UserModel.prototype.signin = function(email, pass){

    var _this = this,
        data = {email: email, pass: pass};

    $.post(this.props.base_url + '/sessions/create', data, function(resp){
      console.log(resp);

      // success
      if (resp.status) {
        _this.userData = resp.user;
        $.publish('users.signin.success', [resp.user, resp.message]);
        $.publish('users.refresh', resp.user);

      // failure
      } else {
        $.publish('users.signin.failure', resp.message);
      }

    },'json');
  };

  UserModel.prototype.signout = function(){
    var _this = this;

    $.post(this.props.base_url + '/sessions/destroy', {}, function(resp){
      console.log(resp);

      _this.userData = false;
      $.publish('users.signout', resp.message);

    },'json');
  };

  UserModel.prototype.signup = function(email, pass){

    var _this = this,
        data = {email: email, pass: pass};

    $.post(this.props.base_url + '/users/create', data, function(resp){
      console.log(resp);

      // success
      if (resp.status) {
        _this.userData = resp.user;
        $.publish('users.signup.success', [resp.user, resp.message]);
        $.publish('users.refresh', resp.user);

      // failure
      } else {
        $.publish('users.signup.failure', resp.message);
      }

    },'json');
  };

  UserModel.prototype.update = function(email, pass, current_pass){
    var _this = this,
        data = {email: email, pass: pass, current_pass: current_pass};

    $.post(this.props.base_url + '/users/update', data, function(resp){
      console.log(resp);

      // success
      if (resp.status) {
        _this.userData = resp.user;
        $.publish('users.update.success', [resp.user, resp.message]);

      // failure
      } else {
        $.publish('users.update.failure', resp.message);
      }

    },'json');
  };

  return UserModel;

})();
