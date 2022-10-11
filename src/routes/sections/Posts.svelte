<script lang="ts">
	import Post from '@src/components/Post.svelte';
	import Section from '@src/layout/Section.svelte';
	import type PostType from '@src/types/Post';
	import { fade } from 'svelte/transition';

	export let posts: PostType[];
</script>

<Section id="posts" revealOnScroll>
	<div class="posts container">
		<h2 class="posts__title">DEV.TO <br /> POSTS</h2>
		{#each posts as post, index}
			<div transition:fade={{ delay: 200 * (index + 1), duration: 500 }}>
				<Post {post} />
			</div>
		{/each}
	</div>
</Section>

<style lang="scss">
	@use '@src/theme/utils';
	@use '@src/theme/components/container';

	.posts {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 2rem;

		@include utils.breakpoint-down('sm') {
			grid-template-columns: 1fr;
		}

		&__title {
			text-align: right;
			margin: auto 0;
		}
	}
</style>
