/* eslint-disable react-hooks/exhaustive-deps */
import { 
  useEffect, 
  useRef, 
  useMemo, 
  useCallback
} from 'react';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import classNames from 'classnames';
import './Icosahedron.scss';

type Props = {
  // String array or single string of classNames
  classList?: Array<string> | string,
};

const Icosahedron = ({ classList }: Props) => {
  const threeRef = useRef(null);
  const renderer = useMemo(() => new THREE.WebGLRenderer(), []);
  const camera = useMemo(() => new THREE.PerspectiveCamera(70, 1, 1, 500), []);
  const effect = useMemo(
    () => new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true }),
    []
  );
  const scene = useMemo(() => new THREE.Scene(), []);

  const handleWindowResize = useCallback(() => {
    const size = Math.min(500, window.innerWidth - 50);
    renderer.setSize(size, size);
    effect.setSize(size, size);
  }, [renderer, effect, camera]);

  useEffect(() => {
    camera.position.y = 20;
    camera.position.z = 500;
    scene.background = new THREE.Color(0, 0, 0);
    const firstLight = new THREE.PointLight(0xffffff);
    firstLight.position.set(500, 500, 500);
    scene.add(firstLight);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    handleWindowResize();
    const secondLight = new THREE.PointLight(0xffffff, 0.25);
    secondLight.position.set(-500, -500, -500);
    scene.add(secondLight);

    const mesh = new THREE.Mesh(
      new THREE.IcosahedronBufferGeometry(275),
      new THREE.MeshLambertMaterial()
    );
    scene.add(mesh);
    const controls = new OrbitControls(camera, effect.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    effect.domElement.style.color = 'white';
    const start = Date.now();
    const render = () => {
      const timer = Date.now() - start;
      mesh.rotation.x = timer * 0.0003;
      mesh.rotation.z = timer * 0.0002;
      controls.update();
      effect.render(scene, camera);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      render();
    };
    threeRef.current.appendChild(effect.domElement);
    window.addEventListener('resize', handleWindowResize, false);
    animate();

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <div
      className={classNames('icosahedron-canvas', classList)}
      ref={threeRef}
    />
  );
};

export default Icosahedron;
