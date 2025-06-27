<script lang="ts">
	import CanvasPortal from '$lib/components/CanvasPortal.svelte';
	import CD from '$lib/components/CD.svelte';
	import { T, useThrelte } from '@threlte/core';
	import { Float, OrbitControls } from '@threlte/extras';
	import { PerspectiveCamera } from 'three';

	let camera = $state<PerspectiveCamera>();
</script>

<CanvasPortal>
	{@const { canvas } = useThrelte()}
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
	</T.Group>
</CanvasPortal>

<section
	class="absolute pointer-events-none inset-0 flex items-center justify-center text-white flex-col"
>
	<h1>HEYYY</h1>
	<p>This is a test paragraph.</p>
	<p>
		My name is Henrique, I'm 25 years old and I'm a Software Engineer @ <b class="text-red-500"
			>Navalia</b
		>
	</p>
</section>
