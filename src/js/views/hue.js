var HueView = (function() {
  function HueView(options) {
    var defaults = {
      brightnessRange: [1, 254],
      hueEndpoint: '',
      hueUsername: '',
      hueEnabled: true
    };
    this.opt = _.extend(defaults, options);

    if (this.opt.hueEnabled) this.loadListeners();
  }

  HueView.prototype.init = function(){
    if (!this.opt.hueEnabled) return false;

    this.lightsURL = this.opt.hueEndpoint + '/' + this.opt.hueUsername + '/lights';
    this.lights = {};
    this.loadLights();
  };

  HueView.prototype.loadLights = function(){
    var _this = this;

    // this.lights = {
    //   "1": { "state": { "on": true } },
    //   "2": { "state": { "on": false } },
    //   "3": { "state": { "on": true } }
    // };
    // setTimeout(function(){
    //   _this.onLightsLoad(_this.lights);
    // }, 1000);
    // return false;

    $.getJSON(this.lightsURL, function(data) {
      if (data) {
        _this.lights = _.extend({}, data);
        _this.onLightsLoad(_this.lights);
      }
    });
  };

  HueView.prototype.loadListeners = function(){
    var _this = this;

    // change light every time relationship is rendered
    $.subscribe('relationship.render', function(e, data){
      _this.onRelationshipRender(data);
    });

    // change light every time relationship is rendered
    $.subscribe('hue.light.toggle', function(e, hueLightId){
      _this.toggleLight(hueLightId);
    });
  };

  HueView.prototype.onLightsLoad = function(lights){
    _.each(lights, function(light, id){
      var data = _.extend({id: id}, light);
      $.publish('hue.light.load', data);
    });
  };

  HueView.prototype.onRelationshipRender = function(data){
    // return false;

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
    this._put(lightId, {"bri": bri});
  };

  HueView.prototype.toggleLight = function(lightId){
    if (!_.has(this.lights, lightId)) return false;
    var light = this.lights[lightId];
    if (light.state.on) this.turnOn(lightId);
    else this.turnOff(lightId);
  };

  HueView.prototype.turn = function(lightId, on){
    if (!_.has(this.lights, lightId)) return false;
    var light = this.lights[lightId];
    var bri = light.state.bri;
    this._put(lightId, {"on": on, "bri": bri});
  };

  HueView.prototype.turnOff = function(lightId){
    this.turn(lightId, false);
  };

  HueView.prototype.turnOn = function(lightId, amount){
    this.turn(lightId, true);
  };

  HueView.prototype._put = function(lightId, data) {
    console.log(lightId, data);
    // return false;

    $.ajax({
        url: this.lightsURL + '/' + lightId + '/state',
        type: 'PUT',
        data: JSON.stringify(data),
        success: function(resp) {
          // console.log(resp);
        }
    });
  };

  return HueView;

})();
