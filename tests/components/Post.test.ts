import { faker } from '@faker-js/faker';
import posts from '@mocks/posts';
import Post from '@src/components/Post.svelte';
import { render } from '@testing-library/svelte';

const post = faker.helpers.arrayElement(posts);

describe('<Post />', () => {
	it('receives an URL', () => {
		const { getByTestId } = render(Post, { post });
		expect(getByTestId('post').getAttribute('href')).toBe(post.url);
	});

	it.each([
		['title', post.title],
		[
			'date',
			new Date(post.date).toLocaleDateString('en', {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			})
		],
		['tags', post.tags.map((tag) => `#${tag}`).join(' ')],
		['reactions count', `${post.reactionsCount} likes`],
		['comments count', `${post.commentsCount} comments`]
	])('renders the %s', (_field, query) => {
		const { getByText } = render(Post, { post });
		expect(getByText(query)).toBeInTheDocument();
	});
});
