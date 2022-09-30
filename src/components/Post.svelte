<script lang="ts">
	import type Post from '@src/types/Post';

	export let post: Post;
</script>

<a class="post" href={post.url} data-testid="post">
	<div class="post__info">
		<small class="post__date">
			{new Date(post.date).toLocaleDateString('en', {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			})}
		</small>
	</div>
	<h2 class="post__title">{post.title}</h2>
	<small class="post__tags">{post.tags.map((tag) => `#${tag}`).join(' ')}</small>
	<div class="post__footer">
		<span class="post__reactions">{post.reactionsCount} likes</span>
		<span class="post__comments">{post.commentsCount} comments</span>
	</div>
</a>

<style lang="scss">
	@use '@src/theme/utils';

	.post {
		display: block;
		border: 1px solid var(--primary-color);
		text-decoration: none;
		&__info {
			display: flex;
			flex-direction: column;
		}

		&__tags {
			font-family: var(--body-font);
		}

		&__footer {
			display: flex;
		}
	}
</style>
