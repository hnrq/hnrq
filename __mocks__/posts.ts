import { faker } from '@faker-js/faker';

import type Post from '$lib/types/Post';

const tags = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() =>
	faker.word.noun()
);

const posts: Post[] = Array.from({ length: 10 }).map(() => ({
	title: faker.helpers.fake('{{hacker.ingverb}} {{hacker.adjective}} {{hacker.noun}}'),
	published_at: faker.date.past().toISOString(),
	published_timestamp: faker.date.past().toISOString(),
	created_at: faker.date.past().toISOString(),
	tag_list: tags,
	tags: tags.join(' '),
	edited_at: faker.date.past().toISOString(),
	last_comment_at: faker.date.past().toISOString(),
	description: faker.lorem.sentence(5),
	type_of: faker.hacker.noun(),
	id: faker.string.uuid(),
	reading_time_minutes: faker.number.int({ min: 1, max: 20 }),
	public_reactions_count: faker.number.int({ min: 0, max: 1000 }),
	positive_reactions_count: faker.number.int({ min: 0, max: 1000 }),
	comments_count: faker.number.int({ min: 0, max: 1000 }),
	canonical_url: faker.internet.url(),
	cover_image: faker.internet.url(),
	url: faker.internet.url()
}));

export default posts;
