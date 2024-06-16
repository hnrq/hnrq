import type * as THREE from 'three';

import type { GLTFLoader } from 'three/examples/jsm/Addons.js';
import HumanoidModel from '@resources/models/humanoid.glb';
import CrossfadeMixer from '@js/utils/CrossfadeMixer';
import type GUI from 'lil-gui';
import type { Subject } from '.';

type FoxOpts = {
  gltfLoader: GLTFLoader;
  gui: GUI;
  debug?: boolean;
};

const Humanoid = async ({ gltfLoader, gui, debug }: FoxOpts): Promise<Subject> => {
  let mixer: ReturnType<typeof CrossfadeMixer>;
  let mesh: THREE.Group<THREE.Object3DEventMap>;

  const gltf = await gltfLoader.loadAsync(HumanoidModel);
  mesh = gltf.scene;
  mesh.scale.set(0.025, 0.025, 0.025);
  mixer = CrossfadeMixer(mesh, gltf.animations);

  if (debug) mixer.createPanel(gui);

  return {
    mesh,
    update: (_, deltaTime) => {
      for (const actionName in mixer?.actions)
        mixer.actions[actionName].weight = mixer.actions[actionName].action.getEffectiveWeight();
      mixer.mixer.update(deltaTime);
    },
  };
};

export default Humanoid;
