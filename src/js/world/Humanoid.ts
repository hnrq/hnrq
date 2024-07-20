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
  | 'Idle'
  | 'Walk'
  | 'Run'
  | 'Open Door'
  | 'Sit to Stand'
  | 'Stand to Sit';

interface HumanoidSubject extends Subject {
  mixer: CrossfadeMixer;
  playAction: (actionName: HumanoidActions) => void;
}

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
  const mixer = new CrossfadeMixer(mesh, gltf.animations);

  if (debug) mixer.createPanel(gui);

  return {
    mesh: mesh as unknown as THREE.Mesh,
    mixer,
    playAction: (action: HumanoidActions) => mixer.playAction(action),
    update: (deltaTime) => {
      mixer.update(deltaTime);
    },
  };
};

export default Humanoid;
