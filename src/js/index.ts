import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import gui from './debug/gui';
import SceneManager from './SceneManager';
import Humanoid from './subjects/Humanoid';
import LoadingBar from './utils/LoadingBar';

import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { DEBUG } from './debug';

const mesh = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 0xff0000, wireframe: true }),
);

mesh.position.set(0, 0, -2);

const { loadingManager } = LoadingBar();
const gltfLoader = new GLTFLoader(loadingManager);

const humanoid = await Humanoid({ gltfLoader, gui, debug: DEBUG });

const sceneManager = SceneManager({ subjects: [humanoid, { mesh }] });

window.addEventListener('resize', () => {
  sceneManager.onWindowResize();
});

const tick = () => {
  window.requestAnimationFrame(tick);
  sceneManager.update();
};

tick();
