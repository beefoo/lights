var SpaceModel = (function() {
  function SpaceModel(options) {
    var defaults = {
      data: {}
    };
    this.opt = _.extend(defaults, options);
    this.init();
  }

  SpaceModel.prototype.init = function(){};

  SpaceModel.prototype.save = function(){
    var _this = this,
        data = {data: JSON.stringify(this.opt.data)};

    $.post(this.opt.base_url + '/spaces/save', data, function(resp){
      console.log(resp);

      // success
      if (resp.status) {
        _this.userData = resp.user;
        $.publish('spaces.save.success', resp.message);

      // failure
      } else {
        $.publish('spaces.save.failure', resp.message);
      }

    },'json');
  };

  return SpaceModel;

})();
