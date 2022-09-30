import { faker } from '@faker-js/faker';

import type Post from '../src/types/Post';

const posts: Post[] = Array.from({ length: 10 }).map(() => ({
	title: faker.helpers.fake('{{hacker.ingverb}} {{hacker.adjective}} {{hacker.noun}}'),
	date: faker.date.past().toISOString(),
	tags: Array.from({ length: faker.datatype.number({ min: 1, max: 5 }) }).map(() =>
		faker.random.word()
	),
	reactionsCount: faker.datatype.number({ min: 0, max: 1000 }),
	commentsCount: faker.datatype.number({ min: 0, max: 1000 }),
	url: faker.internet.url()
}));

export default posts;
