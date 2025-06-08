import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';
import { GUI } from 'https://cdn.jsdelivr.net/npm/dat.gui/build/dat.gui.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/controls/OrbitControls.js';

// Setup scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 0.01);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometry
const geometry = new THREE.TorusGeometry(10, 3, 30, 100);
const material = new THREE.MeshNormalMaterial({ wireframe: false, side: THREE.BackSide });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
controls.rotateSpeed = 0.4;

// GUI parameters
const params = {
  rotationSpeed: 0.01,
  curvature: 3,
  torusRadius: 10
};

const gui = new GUI();
gui.add(params, 'rotationSpeed', 0, 0.1);
gui.add(params, 'curvature', 0.1, 5).onChange(val => {
  torus.geometry.dispose();
  torus.geometry = new THREE.TorusGeometry(params.torusRadius, val, 30, 100);
});
gui.add(params, 'torusRadius', 5, 20).onChange(val => {
  torus.geometry.dispose();
  torus.geometry = new THREE.TorusGeometry(val, params.curvature, 30, 100);
});

// Animation
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.y += params.rotationSpeed;
  torus.scale.setScalar(1 + 0.05 * Math.sin(Date.now() * 0.002)); // pulsing
  controls.update();
  renderer.render(scene, camera);
}

animate();
