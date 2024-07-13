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

const sceneManager = SceneManager({ subjects: [humanoid, floor, { mesh }] });
sceneManager.camera.lookAt(humanoid.mesh.position);
const mouse = new Mouse({ camera: sceneManager.camera, scene: sceneManager.scene, debug: DEBUG });

const controls = IsometricCharacterControls({
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
  mouse.update();
  controls.update(delta);
};

tick();
