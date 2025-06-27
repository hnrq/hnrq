<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	let snippets = new SvelteSet<Snippet>();
	export const addCanvasPortalSnippet = (snippet: Snippet) => {
		snippets.add(snippet);
	};
	export const removeCanvasPortalSnippet = (snippet: Snippet) => {
		snippets.delete(snippet);
	};
</script>

{#each snippets as snippet, i (i)}
	{@render snippet()}
{/each}
