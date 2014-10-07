G.Arc = function(){
  G.Primitive.apply(this, arguments);

}

G.Arc.prototype = Object.create(G.Primitive.prototype);
G.Arc.prototype.constructor = G.Arc;

G.Arc.spawn = function(num, sizeRange, spawnPoint){
  var sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 16, 16))
  // sphere.position.copy(spawnPoint)
  G.scene.add(sphere)
}