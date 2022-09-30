<script>
	import '@src/theme/index.scss';
	import About from './sections/About.svelte';
	import Home from './sections/Home.svelte';
</script>

<div class="index-page">
	<Home />
	<About />
</div>

<style lang="scss">
	@use '@src/theme/utils';

	.index-page {
		display: flex;
		flex-direction: column;
		row-gap: utils.spacing(12);
	}
</style>
