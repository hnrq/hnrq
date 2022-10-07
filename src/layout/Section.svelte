<script lang="ts">
	import { onMount } from 'svelte';

	import { fade } from 'svelte/transition';

	import { browser } from '$app/environment';

	export let style = '';
	export let id: string;
	export let revealOnScroll = false;

	let ref: HTMLElement;
	let visible = !revealOnScroll;

	onMount(() => {
		if (browser && revealOnScroll) {
			const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
				const [entry] = entries;
				visible = entry.isIntersecting;
				if (visible) history.pushState(null, '', `#${id}`);
			};
			const intersectionObserver = new IntersectionObserver(intersectionCallback, {
				threshold: 0.2,
				rootMargin: '-100px'
			});
			intersectionObserver.observe(ref);
		}
	});
</script>

<section {id} {style} bind:this={ref} class="section">
	{#if visible}
		<div transition:fade={{ duration: 500, delay: 200 }} class="section__container">
			<slot />
		</div>
	{/if}
</section>

<style lang="scss">
	@use '@src/theme/utils';

	.section {
		height: 100vh;
		width: 100%;
		scroll-margin-top: utils.spacing(20);
		&__container {
			height: 100%;
			width: 100%;
		}
	}
</style>
