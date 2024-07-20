import * as THREE from 'three';

interface MouseOpts {
  camera: THREE.Camera;
  scene: THREE.Scene;
  debug: boolean;
  canvas: HTMLCanvasElement;
}

export default class Mouse {
  pressed = false;
  raycaster = new THREE.Raycaster();

  private debug: boolean;
  private debugMesh: THREE.Mesh | undefined = undefined;
  private camera: THREE.Camera;
  private scene: THREE.Scene;
  private animationFrameID: number | undefined;
  private position = new THREE.Vector2();

  constructor({ camera, debug, scene, canvas }: MouseOpts) {
    this.debug = debug;
    this.camera = camera;
    this.scene = scene;

    if (this.debug) {
      this.debugMesh = new THREE.Mesh(
        new THREE.CircleGeometry(0.1),
        new THREE.MeshBasicMaterial({ color: 0x555555 }),
      );
      this.debugMesh.rotateX(-(Math.PI / 2));
      this.debugMesh.visible = false;
      this.scene.add(this.debugMesh);
    }

    canvas.addEventListener('pointerdown', (event) => {
      this.pressed = true;
      this.updatePosition(event);
      if (this.debugMesh) this.debugMesh.visible = true;
    });
    canvas.addEventListener('pointerup', () => {
      this.pressed = false;
      if (this.animationFrameID) cancelAnimationFrame(this.animationFrameID);
      if (this.debugMesh) this.debugMesh.visible = false;
    });

    canvas.addEventListener('pointermove', (event) => {
      if (this.pressed) this.updatePosition(event);
    });
  }

  updatePosition = (event: PointerEvent) => {
    this.position.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
    );
  };

  update = () => {
    if (!this.pressed) return;
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
