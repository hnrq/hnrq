import * as THREE from 'three';
import gui from './debug/gui';
import SceneManager from './SceneManager';
import Humanoid from './world/Humanoid';
import LoadingBar from './utils/LoadingBar';

import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { DEBUG } from './debug';
import Mouse from './utils/Mouse';
import Floor from './world/Floor';
import basicMaterial from './materials/Basic';
import IsometricCharacterControls from './utils/IsometricCharacterControls';

const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), basicMaterial);

mesh.position.set(0, 0, -2);

const { loadingManager } = LoadingBar();
const gltfLoader = new GLTFLoader(loadingManager);

const floor = Floor();
const humanoid = await Humanoid({ gltfLoader, gui, debug: DEBUG, material: basicMaterial });

const sceneManager = new SceneManager([humanoid, floor, { mesh }]);
sceneManager.camera.lookAt(humanoid.mesh.position);
const mouse = new Mouse({
  camera: sceneManager.camera,
  scene: sceneManager.scene,
  debug: DEBUG,
  canvas: sceneManager.renderer.domElement,
});

const controls = new IsometricCharacterControls(
  humanoid.mesh,
  floor.mesh,
  sceneManager.camera,
  (action) => humanoid.playAction(action),
  mouse,
  true,
);

window.addEventListener('resize', () => {
  sceneManager.onWindowResize();
});

const tick = () => {
  window.requestAnimationFrame(tick);
  const delta = sceneManager.update();
  mouse.update();
  controls.update(delta);
};

tick();
