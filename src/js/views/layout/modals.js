var ModalsView = (function() {
  function ModalsView(options) {
    var defaults = {
      el: '#modal-container'
    };
    this.opt = _.extend(defaults, options);
    this.init();
  }

  ModalsView.prototype.init = function(){
    this.activeModal = false;
    this.$el = $(this.opt.el);
    this.opt.user = this.opt.user_model.getUserData();
    this.loadListeners();
  };

  ModalsView.prototype.closeModals = function() {
    if (this.activeModal) {
      this.activeModal.remove && this.activeModal.remove();
    }
    this.$el.empty().removeClass('active');
  };

  ModalsView.prototype.loadListeners = function(){
    var _this = this;

    $.subscribe('modals.open', function(e, view, data){
      _this.openModal(view, data);
    });

    $.subscribe('modals.close', function(e){
      _this.closeModals();
    });
  };

  ModalsView.prototype.openModal = function(view, data) {
    if (this.activeModal) this.closeModals();
    this.activeModal = new view(data);
    this.activeModal.init();
    this.$el.append(this.activeModal.el()).addClass('active');
  }

  return ModalsView;

})();
