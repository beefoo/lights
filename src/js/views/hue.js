var HueView = (function() {
  function HueView(options) {
    var defaults = {
      brightnessRange: [1, 254],
      hueEndpoint: '',
      hueUsername: '',
      hueEnabled: true
    };
    this.opt = _.extend(defaults, options);

    if (this.opt.hueEnabled) this.init();
  }

  HueView.prototype.init = function(){
    this.lightsURL = this.opt.hueEndpoint + '/' + this.opt.hueUsername + '/lights';
    this.lights = {};
    this.loadLights();
    this.loadListeners();
  };

  HueView.prototype.loadLights = function(){
    var _this = this;

    $.getJSON(this.lightsURL, function(data) {
      if (data) {
        _this.lights = _.extend({}, data);
      }
    });
  };

  HueView.prototype.loadListeners = function(){
    var _this = this;

    // change light every time relationship is rendered
    $.subscribe('relationship.render', function(e, data){
      _this.onRelationshipRender(data);
    });
  };

  HueView.prototype.onRelationshipRender = function(data){
    // get light
    var lightId = data.light.hueLightId;
    if (!lightId || !_.has(this.lights, lightId)) {
      console.log('Hue light ['+lightId+'] not found');
      return false;
    }
    var light = this.lights[lightId];

    // determine brightness
    var power = data.power;
    var bri = UTIL.lerp(this.opt.brightnessRange[0], this.opt.brightnessRange[1], power);
    bri = Math.round(bri);
    if (light.state.bri == bri) {
      console.log('No state change for Hue light ['+lightId+']');
      return false;
    }

    // set brightness
    this.setBrightness(lightId, bri);
    this.lights[lightId].state.bri = bri;
  };

  HueView.prototype.setBrightness = function(lightId, bri){
    this._put(lightId, {"on": true, "bri": bri});
  };

  HueView.prototype.turnOff = function(lightId){
    this._put(lightId, {"on": false});
  };

  HueView.prototype.turnOn = function(lightId, amount){
    this._put(lightId, {"on": true});
  };

  HueView.prototype._put = function(lightId, data) {
    // console.log(data);
    $.ajax({
        url: this.lightURL + '/' + lightId + '/state',
        type: 'PUT',
        data: JSON.stringify(data),
        success: function(resp) {
          // console.log(resp);
        }
    });
  };

  return HueView;

})();
