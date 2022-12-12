<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import {
		Canvas,
		PerspectiveCamera,
		DirectionalLight,
		OrbitControls,
		Pass,
		Mesh
	} from '@threlte/core';
	import { MeshLambertMaterial, IcosahedronGeometry } from 'three';
	import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
	import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js';

	const effect = new ShaderPass(DotScreenShader);
	effect.uniforms['scale'].value = 1;

	let ref: HTMLDivElement;
	let size: number;

	const onResize = () => {
		size = Math.max(ref?.getBoundingClientRect().width - 50, 400);
		effect.setSize(size, size);
	};

	onMount(() => {
		onResize();
		window.addEventListener('resize', onResize);
	});

	onDestroy(() => {
		window.removeEventListener('resize', onResize);
	});
</script>

<div class="icosahedron" bind:this={ref}>
	<Canvas size={{ width: size, height: size }}>
		<PerspectiveCamera position={{ x: 0, y: 2, z: 5 }} fov={70}>
			<OrbitControls enableZoom={false} enablePan={false} autoRotate />
		</PerspectiveCamera>

		<DirectionalLight position={{ x: 1, y: 1, z: 0 }} />

		<Pass pass={effect} />

		<Mesh material={new MeshLambertMaterial()} geometry={new IcosahedronGeometry(3)} />
	</Canvas>
</div>

<style lang="scss">
	.icosahedron {
		padding: 0;
		box-sizing: content-box;
		display: inline-block;
		margin: 0;
		color: var(--text-color);
		width: 100%;
		height: 100%;
	}
</style>
