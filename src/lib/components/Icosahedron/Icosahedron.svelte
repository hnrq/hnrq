<script lang="ts">
	import { onMount } from 'svelte';

	import { Canvas, T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';

	import IcosahedronMesh from './IcosahedronMesh.svelte';

	let ref: HTMLDivElement;
	let size: number;

	onMount(() => {
		const onResize = () => {
			size = Math.max(ref?.getBoundingClientRect().width - 50, 400);
		};
		onResize();
		window.addEventListener('resize', onResize);

		return () => window.removeEventListener('resize', onResize);
	});
</script>

<div class="icosahedron" bind:this={ref}>
	<Canvas size={{ width: size, height: size }}>
		<T.PerspectiveCamera makeDefault position={[0, 2, 5]} fov={70}>
			<OrbitControls enableZoom={false} enablePan={false} autoRotate />
		</T.PerspectiveCamera>
		<IcosahedronMesh />
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
