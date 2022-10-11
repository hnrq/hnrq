<script lang="ts">
	import type Post from '@src/types/Post';

	export let post: Post;
</script>

<a class="post" href={post['url']} data-testid="post">
	<div class="post__info">
		<small class="post__date">
			{new Date(post['published_at']).toLocaleDateString('en', {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			})}
		</small>
	</div>
	<h3 class="post__title">{post['title']}</h3>
	<small class="post__tags">{post['tag_list'].map((tag) => `#${tag}`).join(' ')}</small>
	<div class="post__footer">
		<small class="post__reactions">{post['public_reactions_count']} likes</small>
		<small class="post__comments">{post['comments_count']} comments</small>
	</div>
</a>

<style lang="scss">
	@use '@src/theme/utils';

	.post {
		color: var(--text-color);
		display: flex;
		flex-direction: column;
		border: 1px solid var(--primary-color);
		text-decoration: none;
		padding: utils.spacing(1);
		transition: transform 0.2s ease-in-out;

		height: 10rem;

		&__date {
			margin-bottom: utils.spacing(2);
		}

		&__title {
			margin: 0;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		&__info {
			display: flex;
			flex-direction: column;
		}

		&__tags {
			font-family: var(--body-font);
		}

		&__footer {
			margin-top: auto;
			display: flex;
			gap: utils.spacing(2);
		}

		&:hover {
			transform: scale(1.05);
		}
	}
</style>
