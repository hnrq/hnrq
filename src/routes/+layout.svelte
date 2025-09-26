<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import '../app.css';
	import type { Snippet } from 'svelte';
	import Parallax from '$lib/components/Parallax.svelte';
	import CanvasPortalTarget from '$lib/components/CanvasPortalTarget.svelte';
	import Player from '$lib/components/Player.svelte';

	let { children }: { children: Snippet<[]> } = $props();
</script>

<Canvas>
	<Parallax />
	<T.DirectionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
	<T.AmbientLight intensity={0.5} />
	<CanvasPortalTarget />
</Canvas>

<div class="absolute top-4 right-8">
	<Player />
</div>

{@render children()}
