<script lang="ts">
	import CanvasPortal from '$lib/components/CanvasPortal.svelte';
	import InteractiveBackground from '$lib/components/InteractiveBackground.svelte';
	import Rack from '$lib/components/Rack.svelte';
	import { T } from '@threlte/core';
	import { cursorPosition, rackRotation } from '$lib/stores/index.svelte';
	import { interactivity } from '@threlte/extras';
	import type { PageServerData } from './$types';
	import { onMount } from 'svelte';

	const { data }: { data: PageServerData } = $props();

	const ROTATION = Math.PI / 2;

	const handleSceneClick = () => {
		if (Math.abs(cursorPosition.current[0]) < 0.01) return;
		rackRotation.set(rackRotation.target + (cursorPosition.current[0] < 0 ? ROTATION : -ROTATION));
	};

	onMount(() => {
		const keyEventListener = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') rackRotation.set(rackRotation.target + ROTATION);
			else if (e.key === 'ArrowRight') rackRotation.set(rackRotation.target - ROTATION);
		};

		document.addEventListener('keydown', keyEventListener);

		return () => {
			document.removeEventListener('keydown', keyEventListener);
		};
	});
</script>

<CanvasPortal>
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
	{@const _ = interactivity()}
	<T.PerspectiveCamera makeDefault fov={50} />
	<InteractiveBackground onclick={handleSceneClick} />
	<Rack articles={data.articles} />
</CanvasPortal>
