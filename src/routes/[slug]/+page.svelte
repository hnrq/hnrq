<script lang="ts">
	import CD from '$lib/components/CD.svelte';
	import { T, useThrelte } from '@threlte/core';
	import { Float, OrbitControls } from '@threlte/extras';
	import { PerspectiveCamera } from 'three';

	let camera = $state<PerspectiveCamera>();

	let { canvas } = useThrelte();
</script>

<T.Group>
	<T.PerspectiveCamera
		view={{
			fullWidth: canvas.width,
			fullHeight: canvas.height,
			offsetX: canvas.width / 5,
			offsetY: 0,
			width: canvas.width,
			height: canvas.height,
			enabled: true
		}}
		bind:ref={camera}
		position={[4, 0, -2]}
		makeDefault
		fov={50}
	>
		<OrbitControls enableZoom={false} enablePan={false} />
	</T.PerspectiveCamera>

	<Float rotationIntensity={1} rotationSpeed={2}>
		<CD scale={[0.15, 0.15, 0.15]} />
	</Float>

	<section class="absolute inset-0 flex items-center justify-center">
		<h1 class="text-white">HEYYY</h1>
	</section>
</T.Group>
