G.Arc = function(){
  G.Primitive.apply(this, arguments);

}

G.Arc.prototype = Object.create(G.Primitive.prototype);
G.Arc.prototype.constructor = G.Arc;

G.Arc.prototype.spawn = function(num, sizeRange, spawnPoint){
  var sphere = new THREE.Mesh(new THREE.SphereGeometry(100, 16, 16))
  // sphere.position.copy(spawnPoint)
  sphere.position.z = -200
  G.scene.add(sphere)
}