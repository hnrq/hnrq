import * as THREE from 'three';
import type Mouse from './Mouse';
import type { Events } from '@js/world/Humanoid';
import type { HumanoidActions } from '@js/world/Humanoid/actions';

const RUN_VELOCITY = 6;
const WALK_VELOCITY = 2;

class IsometricCharacterControls {
  lastEvent: Events = 'stop';
  #currentAction: HumanoidActions;

  constructor(
    private model: THREE.Object3D,
    private floor: THREE.Object3D,
    private changeEvent: (action: Events) => void,
    private mouse: Mouse,
  ) {}

  set currentAction(action: HumanoidActions) {
    this.#currentAction = action;
  }

  public update = (deltaTime: number) => {
    if (!this.mouse.pressed) return this.playEvent('stop');
    const intersects = this.mouse.raycaster.intersectObject(this.floor);
    if (intersects.length === 0) return;
    const mousePosition = intersects[0].point;
    const mouseToModelDistance = this.model.position.distanceTo(mousePosition);

    const newAction: Events =
      mouseToModelDistance < 0.02 ? 'stop' : mouseToModelDistance < 3 ? 'walk' : 'run';
    this.playEvent(newAction);

    if (
      this.#currentAction === 'Idle' ||
      this.#currentAction === 'Walking' ||
      this.#currentAction === 'Running'
    ) {
      this.model.lookAt(mousePosition);

      const velocity = this.lastEvent === 'run' ? RUN_VELOCITY : WALK_VELOCITY;
      const direction = this.model.position.clone().sub(mousePosition).normalize();

      const moveX = -(direction.x * velocity * deltaTime);
      const moveZ = -(direction.z * velocity * deltaTime);

      this.model.position.x += moveX;
      this.model.position.z += moveZ;

      return { moveX, moveZ };
    }
  };

  private playEvent = (action: Events) => {
    if (action !== this.lastEvent) {
      this.changeEvent(action);
      this.lastEvent = action;
    }
  };
}

export default IsometricCharacterControls;
