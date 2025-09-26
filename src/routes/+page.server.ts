import { DEV_TO_API_HOST, DEV_TO_API_KEY } from '$env/static/private';
import { generateAbstractImage } from '$lib/utils/imageGen';

export const load = async () => {
	const data = await fetch(`${DEV_TO_API_HOST}/articles/me?per_page=5`, {
		headers: { 'api-key': DEV_TO_API_KEY }
	});
	const articles = await data.json();

	return {
		articles: articles.map((article: { title: string; url: string }) => ({
			title: article.title,
			back_cover: `https://placehold.co/350x20/ff0000/000000?text=${article.title}`,
			cover: generateAbstractImage(),
			link: article.url
		}))
	};
};
