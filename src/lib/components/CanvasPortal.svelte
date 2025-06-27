<script lang="ts">
	import {
		addCanvasPortalSnippet,
		removeCanvasPortalSnippet
	} from '$lib/components/CanvasPortalTarget.svelte';
	import { onDestroy, type Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
	addCanvasPortalSnippet(children);
	onDestroy(() => {
		removeCanvasPortalSnippet(children);
	});
</script>
