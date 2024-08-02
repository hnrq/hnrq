import * as THREE from 'three';

import type { GLTFLoader } from 'three/examples/jsm/Addons.js';
import HumanoidModel from '@resources/models/Humanoid.glb';
import type GUI from 'lil-gui';
import CrossfadeMixer from '@js/utils/CrossfadeMixer';
import type { Subject } from '@js/types';
import type { HumanoidActions } from './actions';
import setupHumanoidMachine from './actions';
import { Actor, createActor, type EventFromLogic } from 'xstate';

interface HumanoidOpts {
  gltfLoader: GLTFLoader;
  gui: GUI;
  debug?: boolean;
  material: THREE.Material;
}

export type Events = EventFromLogic<ReturnType<typeof setupHumanoidMachine>>['type'];

interface HumanoidSubject extends Subject {
  actor: Actor<ReturnType<typeof setupHumanoidMachine>>;
  playAnimation: (animationEvent: Events) => void;
}

const createHumanoidActionsGUI = (
  machine: Actor<ReturnType<typeof setupHumanoidMachine>>,
  gui: GUI,
) => {
  const folder = gui.addFolder('Humanoid');
  const actions = {
    Walk: () => machine.send({ type: 'walk' }),
    'Do push-ups': () => machine.send({ type: 'do push-ups' }),
    'Sit down': () => machine.send({ type: 'sit' }),
  };
  for (const action in actions) folder.add(actions, action);
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

  const machine = setupHumanoidMachine(crossfadeMixer);

  const actor = createActor(machine).start();
  actor.subscribe((state) => {
    console.log(state.context.currentAction);
    if (state.context.noFade) crossfadeMixer.playActionNoFade(state.context.currentAction);
    else crossfadeMixer.playAction(state.context.currentAction);
  });

  if (debug) {
    createHumanoidActionsGUI(actor, gui);
    crossfadeMixer.createPanel(gui);
  }

  return {
    mesh: mesh as unknown as THREE.Mesh,
    actor,
    playAnimation: (type: Events) => actor.send({ type }),
    update: (deltaTime) => {
      crossfadeMixer.update(deltaTime);
    },
  };
};

export default Humanoid;
