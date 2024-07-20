import * as THREE from 'three';
import type Mouse from './Mouse';

type Actions = 'Idle' | 'Walk' | 'Run';

const RUN_VELOCITY = 6;
const WALK_VELOCITY = 2;

class IsometricCharacterControls {
  private currentAction: Actions = 'Idle';

  constructor(
    private model: THREE.Object3D,
    private floor: THREE.Object3D,
    private camera: THREE.Camera,
    private onActionChange: (action: Actions) => void,
    private mouse: Mouse,
    private cameraFollow?: boolean,
  ) {}

  public update = (deltaTime: number) => {
    if (!this.mouse.pressed && this.currentAction !== 'Idle') {
      this.currentAction = 'Idle';
      this.onActionChange('Idle');
    }
    if (!this.mouse.pressed) return;
    const intersects = this.mouse.raycaster.intersectObject(this.floor);
    if (intersects.length === 0) return;
    const mousePosition = intersects[0].point;
    const mouseToModelDistance = this.model.position.distanceTo(mousePosition);

    const newAction =
      mouseToModelDistance < 0.02 ? 'Idle' : mouseToModelDistance < 3 ? 'Walk' : 'Run';

    if (newAction !== this.currentAction) {
      this.onActionChange(newAction);
      this.currentAction = newAction;
    }

    if (this.currentAction == 'Run' || this.currentAction == 'Walk') {
      this.model.lookAt(mousePosition);

      const velocity = this.currentAction == 'Run' ? RUN_VELOCITY : WALK_VELOCITY;
      const direction = this.model.position.clone().sub(mousePosition).normalize();

      const moveX = -(direction.x * velocity * deltaTime);
      const moveZ = -(direction.z * velocity * deltaTime);

      this.model.position.x += moveX;
      this.model.position.z += moveZ;

      if (this.cameraFollow) this.updateCameraPosition(moveX, moveZ);
    }
  };

  private updateCameraPosition = (moveX: number, moveZ: number) => {
    this.camera.position.x += moveX;
    this.camera.position.z += moveZ;
  };
}

export default IsometricCharacterControls;
