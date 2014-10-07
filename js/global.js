var parameters = (function() {
  var parameters = {};
  var parts = window.location.search.substr(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var parameter = parts[i].split('=');
    parameters[parameter[0]] = parameter[1];
  }
  return parameters;
})();

var controls, effect;

var controls2, clock = new THREE.Clock();

var sky, water;

var cameraPath;

G.shaders = new ShaderLoader('shaders')
G.loader = new Loader();
var c4dLoader = new THREE.C4DLineLoader();
G.loader.addLoad();
c4dLoader.load('models/campath-3.txt', function(line) {
  G.loader.onLoad();
  cameraPath = line;

});

G.loader.onStart = function(){
  this.init();
  this.animate();
}.bind(G)

VRClient.ready().then(function() {
  console.log('kicked off ready');
});

G.init = function() {

  G.renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  G.renderer.autoClear = false;
  document.body.appendChild(G.renderer.domElement);

  G.scene = new THREE.Scene();
  G.scene.fog = new THREE.Fog(0x00000, -4000, 80000);

  dolly = new THREE.Object3D();
  dolly.position.set(500, 500, 500);
  G.scene.add(dolly);

  G.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000000);
  dolly.add(G.camera);

  if (parameters.mode === 'cardboard') {

    controls = new THREE.DeviceOrientationControls(G.camera);
    effect = new THREE.StereoEffect(G.renderer);

  } else {

    controls = new THREE.VRControls(G.camera);
    effect = new THREE.VREffect(G.renderer);

  }

  effect.setSize(window.innerWidth, window.innerHeight);

  document.body.addEventListener('dblclick', function() {

    effect.setFullScreen(true);

  });


  var objLoader = new THREE.ObjectLoader();
  objLoader.load('models/ID-scene-2.json', function(object) {

    G.scene.add(object);

    surface = object.getObjectByName('surface', true)
    surface.children[0].material.wireframe = true;
    surface.children[0].material.transparent = true;
    surface.children[0].material.opacity = 0.2;

  });


}

G.onResize = function() {

  G.camera.aspect = window.innerWidth / window.innerHeight;
  G.camera.updateProjectionMatrix();

  effect.setSize(window.innerWidth, window.innerHeight);

}

G.animate = function() {

  requestAnimationFrame(this.animate);
  if (cameraPath !== undefined) {

    // adjust the number after "performance.now() /" to slow down the animation speed.
    var time = (performance.now() / 160000) % 1;

    var pointA = cameraPath.getPointAt(time);
    var pointB = cameraPath.getPointAt(Math.min(time + 0.015, 1));

    pointA.z = -pointA.z;
    pointB.z = -pointB.z;

    dolly.position.copy(pointA);
    dolly.lookAt(pointB);

    dolly.rotateY(Math.PI); // look forward
  }

  controls.update();

  effect.render(G.scene, G.camera);

}.bind(G)
window.addEventListener('resize', G.onResize.bind(G), false);
