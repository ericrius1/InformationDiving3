G.Primitive = function() {
  this._colorPalette = [0xEF2D5E, 0xFCED49, 0x1BA0D1, 0xA00B5F, 0x93B75E];
  this._materials = []
  this._spawnInterval = 100;
  _.each(this._colorPalette, function(colorValue) {
    this._materials.push(
      new THREE.MeshBasicMaterial({
        color: colorValue
      })
    )
  }.bind(this));

}

// G.Primitive.prototype.update = function() {}

G.Primitive.prototype = {
  constructor: G.Primitive,
  unspawn: function() {},
  update: function() {}
};

//arg 1: num clones to create
//arg 2: size range to randomize by
//arg 3: spawn point to randomize position around
G.Primitive.prototype.init = function(num, sizeRange, spawnPoint){

}