import type Post from '@src/types/Post';
import type { Load } from '@sveltejs/kit';

export const load: Load<
	Record<string, string>,
	Record<string, string>,
	{ posts: Post[] }
> = async ({ fetch }) => {
	const posts = await (await fetch('https://dev.to/api/articles?username=hnrq')).json();

	return { posts };
};
