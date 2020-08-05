import React, { useEffect, useRef, useCallback } from 'react';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three';
import classNames from 'classnames';
import './Icosahedron.scss';

type Props = {
  // String array or single string of classNames
  classList: Array<string> | string,
};

const Icosahedron = ({ classList }: Props) => {
	const threeRef = useRef(null);
	const renderer = useCallback(new THREE.WebGLRenderer(), []);
	const camera = useCallback(new THREE.PerspectiveCamera( 70, 1, 1, 500 ), []);
	const effect = useCallback(new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } ), []);
	const scene = useCallback(new THREE.Scene(), []);

	const handleWindowResize = useCallback(() => {
		const size = window.innerWidth > 500 ? 500 : window.innerWidth - 50;
		camera.aspect = 1;
		camera.updateProjectionMatrix();
		renderer.setSize( size, size );
		effect.setSize( size, size );
	}, [renderer, effect, camera]);
	
  useEffect(() => {
		camera.position.y = 20;
		camera.position.z = 500;
		scene.background = new THREE.Color( 0, 0, 0 );
		const firstLight = new THREE.PointLight( 0xffffff );
		firstLight.position.set( 500, 500, 500 );
		scene.add( firstLight );
		
		const secondLight = new THREE.PointLight( 0xffffff, 0.25 );
		secondLight.position.set( - 500, - 500, - 500 );
		scene.add( secondLight );

		const mesh = new THREE.Mesh( new THREE.IcosahedronBufferGeometry(275), new THREE.MeshPhongMaterial() );
		scene.add(mesh);
		const start = Date.now();

		handleWindowResize();
		const controls = new OrbitControls( camera, effect.domElement );
		effect.domElement.style.color = 'white';
		effect.domElement.style.backgroundColor = 'black';

    const render = () => {
      var timer = Date.now() - start;
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
		
		return () => 	window.removeEventListener('resize', handleWindowResize);
	}, [camera, renderer, scene, handleWindowResize, effect]);
	
  return (
    <div className={classNames("icosahedron-canvas", classList)} ref={threeRef} />
  )
};

export default Icosahedron;