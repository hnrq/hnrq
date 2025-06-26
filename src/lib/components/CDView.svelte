<script lang="ts">
	import { T } from '@threlte/core';
	import { type Mesh } from 'three';
	import { selectedCD } from '$lib/stores';
	import { onMount } from 'svelte';
	import { useTexture } from '@threlte/extras';

	let cdRef: Mesh | undefined = $state(undefined);
	let isDragging = false;
	let previousMousePosition = { x: 0, y: 0 };

	const texture = useTexture($selectedCD?.cover ?? '');

	const rotationSpeed = 0.005;

	let rotationX = $state(0);
	let rotationY = $state(0);

	const handleMouseDown = (event: MouseEvent) => {
		isDragging = true;
		previousMousePosition = { x: event.clientX, y: event.clientY };
	};

	const handleMouseUp = () => {
		isDragging = false;
	};

	const handleMouseMove = (event: MouseEvent) => {
		if (!isDragging || !cdRef) return;
		const deltaX = event.clientX - previousMousePosition.x;
		const deltaY = event.clientY - previousMousePosition.y;
		rotationY += deltaX * rotationSpeed;
		rotationX += deltaY * rotationSpeed;
		cdRef.rotation.y = rotationY;
		cdRef.rotation.x = rotationX;
		previousMousePosition = { x: event.clientX, y: event.clientY };
	};

	function handleClose() {
		// Clear the selected CD
		selectedCD.set(null);
		// Update the URL back to the home path
		history.pushState({}, '', '/');
	}

	onMount(() => {
		window.addEventListener('mouseup', handleMouseUp);
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mouseup', handleMouseUp);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});

	$effect(() => {
		if ($selectedCD) {
			rotationX = 0;
			rotationY = 0;
		}
	});
</script>

{#if $selectedCD}
	{#await $texture then map}
		{@debug map}
		<T.PerspectiveCamera makeDefault position={[0, 0, 3]} />
		<T.DirectionalLight position={[10, 10, 5]} intensity={1.5} />
		<T.AmbientLight intensity={0.8} />

		<T.Mesh
			bind:ref={cdRef}
			onclick={() => window.open($selectedCD?.link, '_blank')}
			rotation.x={rotationX}
			rotation.y={rotationY}
		>
			<T.BoxGeometry args={[2, 2, 0.1]} />
			<T.MeshStandardMaterial {map} />
		</T.Mesh>
	{/await}
{/if}
