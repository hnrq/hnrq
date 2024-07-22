import * as THREE from 'three';

import type { GLTFLoader } from 'three/examples/jsm/Addons.js';
import HumanoidModel from '@resources/models/humanoid.glb';
import CrossfadeMixer from '@js/utils/CrossfadeMixer';
import type GUI from 'lil-gui';
import type { Subject } from '.';

interface HumanoidOpts {
  gltfLoader: GLTFLoader;
  gui: GUI;
  debug?: boolean;
  material: THREE.Material;
}

export type HumanoidActions =
  | 'None'
  | 'Dance'
  | 'Idle'
  | 'Idle to Push-up'
  | 'Open Door'
  | 'Push-up'
  | 'Push-up to idle'
  | 'Run'
  | 'Sit to Stand'
  | 'Sitting'
  | 'Stand to Sit'
  | 'Typing'
  | 'Walk';

interface HumanoidSubject extends Subject {
  mixer: CrossfadeMixer<HumanoidActions>;
  playAction: (actionName: HumanoidActions) => void;
}

const createHumanoidActionsGUI = (crossfadeMixer: CrossfadeMixer<HumanoidActions>, gui: GUI) => {
  const folder = gui.addFolder('Humanoid');
  const actions = {
    'Do push-ups': () => crossfadeMixer.playAction('Idle to Push-up'),
    'Sit down': () => crossfadeMixer.playAction('Stand to Sit'),
  };
  for (const action in actions) folder.add(actions, action);
};

const setupActions = ({
  mixer,
  actions,
  playAction,
  playActionNoFade,
}: CrossfadeMixer<HumanoidActions>) => {
  (
    [
      'Idle to Push-up',
      'Push-up to idle',
      'Sit to Stand',
      'Stand to Sit',
      'Open Door',
    ] as HumanoidActions[]
  ).forEach((actionName) => {
    actions[actionName].loop = THREE.LoopOnce;
  });

  mixer.addEventListener('finished', (e) => {
    console.log(e.action.getClip().name);
    switch (e.action.getClip().name) {
      case 'Idle to Push-up':
        return playActionNoFade('Push-up');
      case 'Stand to Sit':
        return playActionNoFade('Sitting');
      default:
        return playAction('Idle');
    }
  });
};

const Humanoid = async ({
  gltfLoader,
  gui,
  debug,
  material,
}: HumanoidOpts): Promise<HumanoidSubject> => {
  const gltf = await gltfLoader.loadAsync(HumanoidModel);
  gltf.scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) (child as THREE.Mesh).material = material;
  });
  const mesh = gltf.scene;
  mesh.position.set(0, 0, -2);
  const crossfadeMixer = new CrossfadeMixer<HumanoidActions>(mesh, gltf.animations, 'Idle');

  setupActions(crossfadeMixer);

  if (debug) {
    createHumanoidActionsGUI(crossfadeMixer, gui);
    crossfadeMixer.createPanel(gui);
  }

  return {
    mesh: mesh as unknown as THREE.Mesh,
    mixer: crossfadeMixer,
    playAction: (action: HumanoidActions) => crossfadeMixer.playAction(action),
    update: (deltaTime) => {
      crossfadeMixer.update(deltaTime);
    },
  };
};

export default Humanoid;
