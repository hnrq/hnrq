import * as THREE from 'three';
import { EffectComposer, OutlinePass, RenderPass } from 'three/examples/jsm/Addons.js';

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
  private composer: EffectComposer;

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

    this.composer = new EffectComposer(this.#renderer);

    const renderPass = new RenderPass(this.#scene, this.#camera);
    this.composer.addPass(renderPass);

    const outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.#scene,
      this.#camera,
      [this.subjects[0].mesh, this.subjects[2].mesh],
    );
    outlinePass.edgeStrength = 2;
    outlinePass.edgeThickness = 0.05;
    outlinePass.visibleEdgeColor.set(0xffffff);
    outlinePass.hiddenEdgeColor.set(0x0000000);
    this.composer.addPass(outlinePass);
  }

  public update = () => {
    const delta = this.clock.getDelta();
    this.subjects.forEach(({ update }) => update?.(delta));
    this.composer.render(delta);
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
    this.composer.setSize(this.screenDimensions.width, this.screenDimensions.height);
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
