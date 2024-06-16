import * as THREE from 'three';
import gui from './debug/gui';
import SceneManager from './SceneManager';
import Humanoid from './world/Humanoid';
import LoadingBar from './utils/LoadingBar';

import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { DEBUG } from './debug';
import Mouse from './utils/Mouse';
import Floor from './world/Floor';
import MouseCharacterControls from './utils/MouseCharacterControls';

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }),
);

mesh.position.set(0, 0, -2);

const { loadingManager } = LoadingBar();
const gltfLoader = new GLTFLoader(loadingManager);

const floor = Floor();
const humanoid = await Humanoid({ gltfLoader, gui, debug: DEBUG });

const sceneManager = SceneManager({ subjects: [humanoid, floor, { mesh }] });
sceneManager.camera.lookAt(humanoid.mesh.position);
const mouse = new Mouse({ camera: sceneManager.camera, scene: sceneManager.scene, debug: DEBUG });

const controls = MouseCharacterControls({
  model: humanoid.mesh,
  floor: floor.mesh,
  camera: sceneManager.camera,
  cameraFollow: true,
  mouse,
  onActionChange: (action) => humanoid.playAction(action),
});

window.addEventListener('resize', () => {
  sceneManager.onWindowResize();
});

const tick = () => {
  window.requestAnimationFrame(tick);
  const delta = sceneManager.update();
  controls.update(delta);
};

tick();
