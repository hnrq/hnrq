import * as THREE from 'three';
import { type Subject } from './subjects';

type SceneManagerOpts = {
  subjects: Subject[];
};

const SceneManager = (canvas: HTMLCanvasElement, opts: SceneManagerOpts = { subjects: [] }) => {
  const clock = new THREE.Clock();
  const subjects: Subject[] = [...opts.subjects];
  let previousTime = 0;

  const screenDimensions = {
    width: canvas.width,
    height: canvas.height,
  };

  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio ?? 1);
  renderer.setSize(screenDimensions.width, screenDimensions.height);

  const camera = new THREE.PerspectiveCamera(
    60,
    screenDimensions.width / screenDimensions.height,
    1,
    100,
  );

  return {
    update: () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      subjects.forEach(({ update }) => update?.(elapsedTime, deltaTime));
      renderer.render(scene, camera);
    },
    addSubject: (subject: Subject) => subjects.push(subject),
    onWindowResize: () => {
      const { width, height } = canvas;

      screenDimensions.width = width;
      screenDimensions.height = height;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    },
  };
};

export default SceneManager;
