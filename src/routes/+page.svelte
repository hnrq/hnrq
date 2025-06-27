<script lang="ts">
	import CanvasPortal from '$lib/components/CanvasPortal.svelte';
	import InteractiveBackground from '$lib/components/InteractiveBackground.svelte';
	import Rack from '$lib/components/Rack.svelte';
	import { cursorPosition, rackRotation } from '$lib/stores/index.svelte';
	import { interactivity } from '@threlte/extras';

	interactivity();

	const handleSceneClick = () => {
		if (Math.abs(cursorPosition.current[0]) < 0.01) return;
		const amount = Math.PI / 2;
		rackRotation.set(rackRotation.target + (cursorPosition.current[0] < 0 ? amount : -amount));
	};
</script>

<CanvasPortal>
	<InteractiveBackground onclick={handleSceneClick} />
	<Rack />
</CanvasPortal>
