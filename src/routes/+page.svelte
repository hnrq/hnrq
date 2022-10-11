<script lang="ts">
	import type { PageData } from '.svelte-kit/types/src/routes/$types';

	import '@src/theme/index.scss';
	import About from './sections/About.svelte';
	import Home from './sections/Home.svelte';
	import Posts from './sections/Posts.svelte';

	export let data: PageData;
</script>

<div class="index">
	<Home />
	<About />
	<Posts posts={data.posts} />
</div>

<style lang="scss">
	@use '@src/theme/utils';

	.index {
		display: flex;
		flex-direction: column;
		row-gap: utils.spacing(12);
		margin-bottom: utils.spacing(12);
	}
</style>
