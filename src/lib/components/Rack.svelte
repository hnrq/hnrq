<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { get } from 'svelte/store';
	import { projects, posts, links } from '$lib/data';
	import { rackRotation } from '$lib/stores';
	import CD from './CD.svelte';
	import { type Group, MathUtils, type Object3DEventMap } from 'three';

	let rackRef: Group<Object3DEventMap> | undefined = $state();

	// Smoothly animate the rack to the target rotation
	useTask((delta) => {
		if (!rackRef) return;

		const currentRotation = rackRef.rotation.y;
		const targetRotation = get(rackRotation);
		rackRef.rotation.y = MathUtils.lerp(currentRotation, targetRotation, delta * 5);
	});

	const sideDistance = 1.5;
	const cdSpacing = 1.0;

	const sides = [
		{ title: 'Projects', items: projects },
		{ title: 'Posts', items: posts },
		{ title: 'Links', items: links },
		{ title: 'Nothing', items: [] }
	];
</script>

<T.Group bind:ref={rackRef}>
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
					<CD {item} />
				</T.Group>
			{/each}
		</T.Group>
	{/each}
</T.Group>
