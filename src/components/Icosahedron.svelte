<script lang="ts">
	import { onMount } from 'svelte';

	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect';

	import { browser } from '$app/environment';

	let ref: HTMLElement;

	onMount(async () => {
		if (browser) {
			const THREE = await import('three');

			const renderer = new THREE.WebGLRenderer();
			const camera = new THREE.PerspectiveCamera(70, 1, 1, 500);
			const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
			const scene = new THREE.Scene();
			const handleWindowResize = () => {
				const size = ref?.getBoundingClientRect().width - 50 || 400;
				renderer.setSize(size, size);
				effect.setSize(size, size);
			};

			camera.position.y = 20;
			camera.position.z = 500;
			scene.background = new THREE.Color(0, 0, 0);
			const firstLight = new THREE.PointLight(0xffffff);
			firstLight.position.set(500, 500, 500);
			const secondLight = new THREE.PointLight(0xffffff);
			secondLight.position.set(-500, -500, -500);
			scene.add(firstLight);
			scene.add(secondLight);
			camera.aspect = 1;
			camera.updateProjectionMatrix();
			handleWindowResize();

			const mesh = new THREE.Mesh(
				new THREE.IcosahedronGeometry(275),
				new THREE.MeshLambertMaterial()
			);
			scene.add(mesh);
			const controls = new OrbitControls(camera, effect.domElement);
			controls.enableZoom = false;
			controls.enablePan = false;
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

			ref.appendChild(effect.domElement);
			window.addEventListener('resize', handleWindowResize, false);
			animate();
		}
	});
</script>

<div class="icosahedron" bind:this={ref} />

<style lang="scss">
	.icosahedron {
		padding: 0;
		box-sizing: content-box;
		display: inline-block;
		margin: 0;
		color: var(--text-color);
		width: 100%;
	}
</style>
