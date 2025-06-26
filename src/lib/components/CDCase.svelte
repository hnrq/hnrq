<script lang="ts">
	import { T } from '@threlte/core';
	import { SRGBColorSpace, TextureLoader } from 'three';
	import type { PortfolioItem } from '$lib/data';
	import { Spring } from 'svelte/motion';
	import type { IntersectionEvent } from '@threlte/extras';
	import { goto } from '$app/navigation';

	// Props
	let { item }: { item: PortfolioItem } = $props();

	// State
	const lift = new Spring(0);

	// Resources
	const texture = new TextureLoader().load(item.cover);
	texture.colorSpace = SRGBColorSpace;

	const handleClick = (e: IntersectionEvent<MouseEvent>) => {
		e.stopPropagation();
		goto(`/${item.slug}`);
	};
</script>

<T.Mesh
	onpointerenter={() => lift.set(0.1)}
	onpointerleave={() => lift.set(0)}
	onclick={handleClick}
	position.y={lift.current}
	rotation.x={lift.current}
	scale={1}
	castShadow
>
	<T.BoxGeometry args={[0.8, 0.8, 0.1]} />
	<T.MeshStandardMaterial map={texture} />
</T.Mesh>
