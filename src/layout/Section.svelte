<script lang="ts">
	import { onMount } from 'svelte';

	import { fade } from 'svelte/transition';

	import { browser } from '$app/environment';

	let id: string;
	let revealOnScroll = false;
	let ref: HTMLElement;
	let visible = !revealOnScroll;

	onMount(() => {
		if (browser && revealOnScroll) {
			const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
				const [entry] = entries;
				visible = entry.isIntersecting;
			};
			const intersectionObserver = new IntersectionObserver(intersectionCallback, {
				threshold: 0.3,
				rootMargin: '-100'
			});
			intersectionObserver.observe(ref);
		}
	});
</script>

<section {id} bind:this={ref} class="section">
	{#if visible}
		<div transition:fade={{ duration: 500 }} class="section__container">
			<slot />
		</div>
	{/if}
</section>

<style lang="scss">
	.section {
		height: 100vh;
		width: 100%;
		&__container {
			height: 100%;
			width: 100%;
		}
	}
</style>
