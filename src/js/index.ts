import * as THREE from 'three';
import gui from './debug/gui';
import SceneManager from './SceneManager';
import Humanoid from './world/Humanoid';

import Mouse from './utils/Mouse';
import Floor from './world/Floor';
import basicMaterial from './materials/Basic';

const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), basicMaterial);

mesh.position.set(0, 0, -2);

const floor = Floor();

const sceneManager = new SceneManager([floor, { mesh }]);

const mouse = new Mouse({
  camera: sceneManager.camera,
  scene: sceneManager.scene,
  debug: import.meta.env.VITE_DEBUG,
  canvas: sceneManager.renderer.domElement,
});

const humanoid = new Humanoid({
  gui,
  debug: import.meta.env.VITE_DEBUG,
  mouse,
  camera: sceneManager.camera,
  intersectionObject: floor.mesh,
  material: basicMaterial,
});

sceneManager.addSubject(humanoid);
sceneManager.camera.lookAt(humanoid.mesh.position);

window.addEventListener('resize', () => {
  sceneManager.onWindowResize();
});

const tick = () => {
  window.requestAnimationFrame(tick);
  sceneManager.update();
  mouse.update();
};

tick();
