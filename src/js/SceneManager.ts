import * as THREE from 'three';

interface Subject {
  mesh: THREE.Mesh;
  update?: (delta: number) => void;
}

class SceneManager {
  #scene = new THREE.Scene();
  #renderer = new THREE.WebGLRenderer();
  #camera: THREE.PerspectiveCamera;
  private clock = new THREE.Clock();
  private screenDimensions: { width: number; height: number };

  constructor(private subjects: Subject[]) {
    document.body.appendChild(this.#renderer.domElement);

    this.screenDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.#scene.add(...this.subjects.map(({ mesh }) => mesh));
    this.#renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.#renderer.setSize(this.screenDimensions.width, this.screenDimensions.height);

    this.#camera = new THREE.PerspectiveCamera(
      60,
      this.screenDimensions.width / this.screenDimensions.height,
      1,
      100,
    );

    this.#camera.position.set(8, 8, 3);
  }

  public update = () => {
    const delta = this.clock.getDelta();
    this.subjects.forEach(({ update }) => update?.(delta));
    this.renderer.render(this.#scene, this.#camera);
    return delta;
  };

  public addSubject = (subject: Subject) => {
    this.subjects.push(subject);
    this.#scene.add(subject.mesh);
  };

  public onWindowResize = () => {
    this.screenDimensions.width = window.innerWidth;
    this.screenDimensions.height = window.innerHeight;

    this.#camera.aspect = this.screenDimensions.width / this.screenDimensions.height;
    this.#camera.updateProjectionMatrix();

    this.#renderer.setSize(this.screenDimensions.width, this.screenDimensions.height);
    this.#renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  get scene() {
    return this.#scene;
  }
  get renderer() {
    return this.#renderer;
  }
  get camera() {
    return this.#camera;
  }
}

export default SceneManager;
