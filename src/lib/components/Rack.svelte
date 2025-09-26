<script lang="ts">
	import { T } from '@threlte/core';
	import { projects, links } from '$lib/data';
	import { rackRotation } from '$lib/stores/index.svelte';
	import CDCase from './CDCase.svelte';
	import { type Group, type Object3DEventMap } from 'three';

	const { articles }: { articles: JSON } = $props();

	let rackRef: Group<Object3DEventMap> | undefined = $state();

	const sideDistance = 1.0;
	const cdSpacing = 0.5;

	console.log(articles);

	const sides = [
		{ title: 'Projects', items: Object.values(projects) },
		{ title: 'Posts', items: Object.values(articles) },
		{ title: 'Links', items: Object.values(links) },
		{ title: 'Nothing', items: [] }
	];
</script>

<T.Group bind:ref={rackRef} position.z={-5} rotation.y={rackRotation.current}>
	{#each sides as side, i (side.title)}
		{@const angle = i * (Math.PI / 2)}
		{@const xPos = Math.sin(angle) * sideDistance}
		{@const zPos = Math.cos(angle) * sideDistance}

		<T.Group position={[xPos, 0, zPos]} rotation.y={angle}>
			<!-- Calculate the starting position to center the CDs on the rack -->
			{@const startX = (-(side.items.length - 1) / 2) * cdSpacing}

			<!-- Render the CDs for the current side -->
			{#each side.items as item, j (item.title)}
				<T.Group position.y={startX + j * cdSpacing} rotation.x={Math.PI / 4}>
					<CDCase {item} />
				</T.Group>
			{/each}
		</T.Group>
	{/each}
</T.Group>
