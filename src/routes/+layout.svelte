<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import '../app.css';
	import type { Snippet } from 'svelte';
	import Parallax from '$lib/components/Parallax.svelte';
	import CanvasPortalTarget from '$lib/components/CanvasPortalTarget.svelte';

	let { children }: { children: Snippet<[]> } = $props();
</script>

<Canvas>
	<Parallax />
	<T.PerspectiveCamera makeDefault fov={50} />
	<T.DirectionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
	<T.AmbientLight intensity={0.5} />
	<CanvasPortalTarget />
</Canvas>

{@render children()}
