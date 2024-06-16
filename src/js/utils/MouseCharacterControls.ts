import * as THREE from 'three';
import type Mouse from './Mouse';

type Actions = 'Idle' | 'Walk' | 'Run';

interface MouseCharacterControlsOpts {
  model: THREE.Object3D;
  floor: THREE.Object3D;
  camera: THREE.Camera;
  onActionChange: (action: Actions) => void;
  mouse: Mouse;
  cameraFollow?: boolean;
}

const RUN_VELOCITY = 5;
const WALK_VELOCITY = 1.5;

const MouseCharacterControls = ({
  model,
  floor,
  camera,
  onActionChange,
  mouse,
  cameraFollow,
}: MouseCharacterControlsOpts) => {
  let currentAction: Actions = 'Idle';
  const update = (deltaTime: number) => {
    if (!mouse.pressed && currentAction !== 'Idle') {
      currentAction = 'Idle';
      return onActionChange('Idle');
    }
    if (!mouse.pressed) return;
    const intersects = mouse.raycaster.intersectObject(floor);
    if (intersects.length === 0) return;
    const mousePosition = intersects[0].point;
    const mouseToModelDistance = model.position.distanceTo(mousePosition);

    const newAction =
      mouseToModelDistance < 0.02 ? 'Idle' : mouseToModelDistance < 3 ? 'Walk' : 'Run';

    if (newAction !== currentAction) {
      onActionChange(newAction);
      currentAction = newAction;
    }

    if (currentAction == 'Run' || currentAction == 'Walk') {
      model.lookAt(mousePosition);

      const velocity = currentAction == 'Run' ? RUN_VELOCITY : WALK_VELOCITY;
      const direction = model.position.clone().sub(mousePosition).normalize();

      const moveX = -(direction.x * velocity * deltaTime);
      const moveZ = -(direction.z * velocity * deltaTime);

      model.position.x += moveX;
      model.position.z += moveZ;

      if (cameraFollow) updateCameraPosition(moveX, moveZ);
    }
  };

  const updateCameraPosition = (moveX: number, moveZ: number) => {
    camera.position.x += moveX;
    camera.position.z += moveZ;
  };

  return { update };
};

export default MouseCharacterControls;
