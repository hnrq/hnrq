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
			};
			const intersectionObserver = new IntersectionObserver(intersectionCallback, {
				threshold: 0.1
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
	@use '$lib/theme/utils';

	.section {
		min-height: 100vh;
		width: 100%;
		scroll-margin-top: utils.spacing(20);
		@include utils.breakpoint-down('sm') {
			scroll-margin-top: utils.spacing(16);
		}
		&__container {
			height: 100%;
			width: 100%;
		}
	}
</style>
