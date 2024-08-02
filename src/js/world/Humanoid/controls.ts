import * as THREE from 'three';
import type { Events } from '@js/world/Humanoid';
import type Mouse from '@js/utils/Mouse';

export default class HumanoidControls {
  lastEvent: Events = 'stop';

  constructor(
    private model: THREE.Object3D,
    private intersectionObject: THREE.Object3D,
    private dispatchEvent: (type: Events) => void,
    private mouse: Mouse,
  ) {}

  public update = (deltaTime: number, velocity: number) => {
    if (!this.mouse.pressed) return this.changeEvent('stop');
    const intersects = this.mouse.raycaster.intersectObject(this.intersectionObject);
    if (intersects.length === 0) return;
    const mousePosition = intersects[0].point;
    const mouseToModelDistance = this.model.position.distanceTo(mousePosition);

    const newEvent: Events =
      mouseToModelDistance < 0.02 ? 'stop' : mouseToModelDistance < 3 ? 'walk' : 'run';
    this.changeEvent(newEvent);

    if (velocity) {
      this.model.lookAt(mousePosition);
      const direction = this.model.position.clone().sub(mousePosition).normalize();
      const moveX = -(direction.x * velocity * deltaTime);
      const moveZ = -(direction.z * velocity * deltaTime);

      this.model.position.x += moveX;
      this.model.position.z += moveZ;

      return { x: moveX, z: moveZ };
    }
  };

  private changeEvent = (event: Events) => {
    if (event === this.lastEvent) return;

    this.dispatchEvent(event);
    this.lastEvent = event;
  };
}
