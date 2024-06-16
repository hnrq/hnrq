import * as THREE from 'three';
import { type Subject } from './subjects';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface SceneManagerOpts {
  subjects: Subject[];
}

const SceneManager = (opts: SceneManagerOpts = { subjects: [] }) => {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();
  document.body.appendChild(renderer.domElement);

  const clock = new THREE.Clock();
  const subjects: Subject[] = [...opts.subjects];
  let previousTime = 0;

  const screenDimensions = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  scene.add(...subjects.map(({ mesh }) => mesh));
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(screenDimensions.width, screenDimensions.height);

  const camera = new THREE.PerspectiveCamera(
    60,
    screenDimensions.width / screenDimensions.height,
    1,
    100,
  );

  const controls = new OrbitControls(camera, renderer.domElement);

  return {
    camera,
    update: () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;
      controls.update();
      subjects.forEach(({ update }) => update?.(elapsedTime, deltaTime));

      renderer.render(scene, camera);
    },
    addSubject: (subject: Subject) => {
      subjects.push(subject);
      scene.add(subject.mesh);
    },
    onWindowResize: () => {
      screenDimensions.width = window.innerWidth;
      screenDimensions.height = window.innerHeight;

      camera.aspect = screenDimensions.width / screenDimensions.height;
      camera.updateProjectionMatrix();

      renderer.setSize(screenDimensions.width, screenDimensions.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    },
  };
};

export default SceneManager;
