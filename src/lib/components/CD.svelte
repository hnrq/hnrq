<script lang="ts">
	import { T } from '@threlte/core';
	import { SRGBColorSpace, TextureLoader } from 'three';
	import type { PortfolioItem } from '$lib/data';
	import { selectedCD } from '$lib/stores';

	// Props
	let { item }: { item: PortfolioItem } = $props();

	// State
	let isHovered = $state(false);
	const liftAmount = $state(0.15); // How much the CD lifts on hover

	// Resources
	const texture = new TextureLoader().load(item.cover);
	texture.colorSpace = SRGBColorSpace;

	function handleClick() {
		// Set the selected CD in the store
		selectedCD.set(item);
		// Update the URL to match the selected CD's slug
		history.pushState({}, '', `/${item.slug}`);
	}
</script>

<T.Mesh
	onpointerenter={() => (isHovered = true)}
	onpointerleave={() => (isHovered = false)}
	onclick={handleClick}
	position.y={isHovered ? liftAmount : 0}
	rotation.x={isHovered ? 0.1 : 0}
	scale={1}
	castShadow
>
	<T.BoxGeometry args={[0.8, 0.8, 0.1]} />
	<T.MeshStandardMaterial map={texture} />
</T.Mesh>
