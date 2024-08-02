import * as THREE from 'three';

import HumanoidModel from '@resources/models/Humanoid.glb';
import type GUI from 'lil-gui';
import CrossfadeMixer from '@js/utils/CrossfadeMixer';
import type { Subject } from '@js/types';
import type { HumanoidActions } from './actions';
import setupHumanoidMachine from './actions';
import { Actor, createActor, type EventFromLogic } from 'xstate';
import HumanoidControls from './controls';
import type Mouse from '@js/utils/Mouse';
import gltfLoader from '@js/utils/gltfLoader';

interface HumanoidOpts {
  gui: GUI;
  mouse: Mouse;
  intersectionObject: THREE.Mesh;
  material: THREE.Material;
  camera?: THREE.Camera;
  debug?: boolean;
}

export type Events = EventFromLogic<ReturnType<typeof setupHumanoidMachine>>['type'];

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

const model = await gltfLoader.loadAsync(HumanoidModel);

export default class Humanoid implements Subject {
  #mesh: THREE.Group<THREE.Object3DEventMap>;
  #actor: Actor<ReturnType<typeof setupHumanoidMachine>>;
  #crossfadeMixer: CrossfadeMixer<HumanoidActions>;
  #controls: HumanoidControls;
  #camera?: THREE.Camera;
  #previousSnapshot?: ReturnType<Actor<ReturnType<typeof setupHumanoidMachine>>['getSnapshot']>;

  constructor({ gui, debug, mouse, intersectionObject, camera, material }: HumanoidOpts) {
    this.#mesh = model.scene;
    this.#mesh.position.set(0, 0, -2);
    this.#camera = camera;
    this.#crossfadeMixer = new CrossfadeMixer<HumanoidActions>(
      this.#mesh,
      model.animations,
      'Idle',
    );
    this.#actor = createActor(setupHumanoidMachine(this.#crossfadeMixer)).start();
    this.#controls = new HumanoidControls(
      this.#mesh,
      intersectionObject,
      (type: Events) => this.#actor.send({ type }),
      mouse,
    );

    this.#mesh.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) (child as THREE.Mesh).material = material;
    });

    this.#actor.subscribe((state) => {
      if (state.context.currentAction === this.#previousSnapshot?.context.currentAction) return;

      this.#crossfadeMixer.playAction(state.context.currentAction);
      this.#previousSnapshot = state;
    });

    if (debug) {
      createHumanoidActionsGUI(this.#actor, gui);
      this.#crossfadeMixer.createPanel(gui);
    }
  }

  public playAnimation = (type: Events) => {
    this.#actor.send({ type });
  };

  public update = (deltaTime: number) => {
    this.#crossfadeMixer.update(deltaTime);
    const offset = this.#controls.update(deltaTime, this.#previousSnapshot?.context.velocity ?? 0);

    if (offset && this.#camera) {
      this.#camera.position.x += offset.x;
      this.#camera.position.z += offset.z;
    }
  };

  get mesh() {
    return this.#mesh as unknown as THREE.Mesh;
  }

  get actor() {
    return this.#actor;
  }
}
