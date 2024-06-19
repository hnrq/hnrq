import * as THREE from 'three';

import type { GLTFLoader } from 'three/examples/jsm/Addons.js';
import HumanoidModel from '@resources/models/humanoid.glb';
import CrossfadeMixer from '@js/utils/CrossfadeMixer';
import type GUI from 'lil-gui';
import type { Subject } from '.';

interface FoxOpts {
  gltfLoader: GLTFLoader;
  gui: GUI;
  debug?: boolean;
}

export type HumanoidActions =
  | 'None'
  | 'Idle'
  | 'Walk'
  | 'Run'
  | 'Open Door'
  | 'Sit to Stand'
  | 'Stand to Sit';

type HumanoidSubject = Subject & {
  mixer: ReturnType<typeof CrossfadeMixer>;
  playAction: (actionName: HumanoidActions) => void;
};

const basicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const Humanoid = async ({ gltfLoader, gui, debug }: FoxOpts): Promise<HumanoidSubject> => {
  const gltf = await gltfLoader.loadAsync(HumanoidModel);
  gltf.scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) (child as THREE.Mesh).material = basicMaterial;
  });
  const mesh = gltf.scene;
  mesh.position.set(0, 0, -2);
  const mixer = CrossfadeMixer(mesh, gltf.animations);

  if (debug) mixer.createPanel(gui);

  return {
    mesh,
    mixer,
    playAction: (action: HumanoidActions) => mixer.playAction(action),
    update: (deltaTime) => {
      mixer.mixer.update(deltaTime);
    },
  };
};

export default Humanoid;
