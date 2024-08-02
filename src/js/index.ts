import * as THREE from 'three';
import gui from './debug/gui';
import SceneManager from './SceneManager';
import Humanoid from './world/Humanoid';

import Mouse from './utils/Mouse';
import Floor from './world/Floor';
import basicMaterial from './materials/Basic';
import IsometricCharacterControls from './utils/IsometricCharacterControls';
import gltfLoader from './utils/gltfLoader';

const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), basicMaterial);

mesh.position.set(0, 0, -2);

const floor = Floor();
const humanoid = await Humanoid({
  gltfLoader,
  gui,
  debug: import.meta.env.VITE_DEBUG,
  material: basicMaterial,
});

const sceneManager = new SceneManager([humanoid, floor, { mesh }]);
sceneManager.camera.lookAt(humanoid.mesh.position);
const mouse = new Mouse({
  camera: sceneManager.camera,
  scene: sceneManager.scene,
  debug: import.meta.env.VITE_DEBUG,
  canvas: sceneManager.renderer.domElement,
});

const controls = new IsometricCharacterControls(
  humanoid.mesh,
  floor.mesh,
  (action) => humanoid.playAnimation(action),
  mouse,
);

humanoid.actor.subscribe((state) => {
  controls.currentAction = state.context.currentAction;
});

window.addEventListener('resize', () => {
  sceneManager.onWindowResize();
});

const tick = () => {
  window.requestAnimationFrame(tick);
  const delta = sceneManager.update();
  mouse.update();
  const move = controls.update(delta);

  if (move) {
    sceneManager.camera.position.x += move.moveX;
    sceneManager.camera.position.z += move.moveZ;
  }
};

tick();
