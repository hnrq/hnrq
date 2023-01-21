<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import {
		Mesh,
		Canvas,
		PerspectiveCamera,
		DirectionalLight,
		OrbitControls,
		SpotLight
	} from '@threlte/core';
	import {
		BufferGeometry,
		Color,
		IcosahedronGeometry,
		MeshPhongMaterial,
		Mesh as MeshType
	} from 'three';
	import PixelPostprocessing from '@src/components/PixelPostprocessing.svelte';

	let ref: HTMLDivElement;
	let size: number;
	let mesh: MeshType<BufferGeometry>;

	const onResize = () => {
		size = Math.max(ref?.getBoundingClientRect().width - 50, 400);
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
		<Mesh
			bind:mesh
			material={new MeshPhongMaterial({ color: new Color(0.7, 0, 1) })}
			geometry={new IcosahedronGeometry(3)}
		/>
		<DirectionalLight position={{ x: 100, y: 100, z: 100 }} />
		<SpotLight color={0xff8800} distance={10} angle={Math.PI / 16} target={mesh} />
		<PixelPostprocessing pixelSize={15} />
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
