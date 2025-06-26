<script lang="ts">
	import { T } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import Rack from '$lib/components/Rack.svelte';
	import { rackRotation, selectedCD } from '$lib/stores';
	import CDView from '$lib/components/CDView.svelte';
	import { get } from 'svelte/store';
	import { Spring } from 'svelte/motion';
	import { Vector2, type Vector2Tuple } from 'three';

	interactivity();
	const cursorPosition = new Spring<Vector2Tuple>([0, 0]);

	const rotateRack = (direction: 'left' | 'right') => {
		const amount = Math.PI / 2;
		rackRotation.update((r) => r + (direction === 'left' ? amount : -amount));
	};

	const handleSceneClick = (event: MouseEvent) => {
		if (get(selectedCD)) return;
		console.log('aaaaa');
		if (event.clientX < window.innerWidth / 2) rotateRack('left');
		else rotateRack('right');
	};

	$inspect(cursorPosition.current);
</script>

<T.Mesh
	visible={false}
	onpointermove={(event) => {
		const position = event.point.toArray();
		cursorPosition.set([
			(position[0] / window.innerWidth) * 20,
			(position[1] / window.innerHeight) * 20
		]);
	}}
	position.z={-10}
	scale={100}
>
	<T.PlaneGeometry />
</T.Mesh>
<!-- Main container now handles clicks for rotation -->
<T.PerspectiveCamera makeDefault position={[...cursorPosition.current, 7]} fov={50} />
<T.DirectionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
<T.AmbientLight intensity={0.5} />
<T.Fog attach="fog" args={['#111827', 5, 20]} />
<T.Color attach="background" args={['#111827']} />
<Rack />
<CDView />
