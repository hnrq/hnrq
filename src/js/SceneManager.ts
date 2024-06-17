import * as THREE from 'three';
import { type Subject } from './world';

interface SceneManagerOpts {
  subjects: Subject[];
}

const SceneManager = (opts: SceneManagerOpts = { subjects: [] }) => {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();
  document.body.appendChild(renderer.domElement);

  const clock = new THREE.Clock();
  const subjects: Subject[] = [...opts.subjects];

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

  camera.position.set(8, 8, 3);

  return {
    camera,
    scene,
    update: () => {
      const delta = clock.getDelta();
      subjects.forEach(({ update }) => update?.(delta));
      renderer.render(scene, camera);
      return delta;
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
