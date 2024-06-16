import * as THREE from 'three';

interface MouseOpts {
  camera: THREE.Camera;
  scene: THREE.Scene;
  debug: boolean;
}

export default class Mouse {
  pressed = false;
  raycaster = new THREE.Raycaster();

  private debug: boolean;
  private debugMesh: THREE.Mesh | undefined = undefined;
  private camera: THREE.Camera;
  private scene: THREE.Scene;
  private position = new THREE.Vector2();

  constructor({ camera, debug, scene }: MouseOpts) {
    this.debug = debug;
    this.camera = camera;
    this.scene = scene;

    if (this.debug) {
      this.debugMesh = new THREE.Mesh(
        new THREE.CircleGeometry(0.1),
        new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }),
      );
      this.debugMesh.rotateX(Math.PI / 2);
      this.debugMesh.visible = false;
      this.scene.add(this.debugMesh);
    }

    window.addEventListener('pointerdown', (event) => {
      this.pressed = true;
      this.updateRaycaster(event);
      if (this.debugMesh) this.debugMesh.visible = true;
    });
    window.addEventListener('pointerup', () => {
      this.pressed = false;
      if (this.debugMesh) this.debugMesh.visible = false;
    });

    window.addEventListener('pointermove', (event) => {
      if (!this.pressed) return;
      this.updateRaycaster(event);
    });
  }

  updateRaycaster = (event: MouseEvent) => {
    this.position.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
    );
    this.raycaster.setFromCamera(this.position, this.camera);

    if (this.debug) {
      const intersects = this.raycaster.intersectObjects(this.scene.children);
      if (intersects.length > 0) {
        const { point } = intersects[0];
        this.debugMesh?.position.copy(point);
      }
    }
  };
}
