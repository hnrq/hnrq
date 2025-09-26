// data.ts
// This file contains the data for the portfolio items.
// I've added a 'slug' property for URL routing.

export interface PortfolioItem {
	title: string;
	cover: string;
	link: string;
	slug: string; // URL-friendly identifier
}

// Helper to generate slugs
const toSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-');

export const projects: Record<string, PortfolioItem> = {
	[toSlug('Project 1')]: {
		title: 'Project 1',
		cover: 'https://placehold.co/300x300/fbcfe8/4a044e?text=Project+1',
		link: 'https://example.com/project1',
		slug: toSlug('Project 1')
	},
	[toSlug('Project 2')]: {
		title: 'Project 2',
		cover: 'https://placehold.co/300x300/fbcfe8/4a044e?text=Project+2',
		link: 'https://example.com/project2',
		slug: toSlug('Project 2')
	},
	[toSlug('Project 3')]: {
		title: 'Project 3',
		cover: 'https://placehold.co/300x300/fbcfe8/4a044e?text=Project+3',
		link: 'https://example.com/project3',
		slug: toSlug('Project 3')
	}
};

export const links: Record<string, PortfolioItem> = {
	[toSlug('GitHub')]: {
		title: 'GitHub',
		cover: 'https://placehold.co/300x300/e0e7ff/1e1b4b?text=GitHub',
		link: 'https://github.com/example',
		slug: toSlug('GitHub')
	},
	[toSlug('LinkedIn')]: {
		title: 'LinkedIn',
		cover: 'https://placehold.co/300x300/e0e7ff/1e1b4b?text=LinkedIn',
		link: 'https://linkedin.com/in/example',
		slug: toSlug('LinkedIn')
	},
	[toSlug('Email')]: {
		title: 'Email',
		cover: 'https://placehold.co/300x300/e0e7ff/1e1b4b?text=Email',
		link: 'mailto:example@example.com',
		slug: toSlug('Email')
	}
};

// Combine all items for easy searching
export const allItems = { ...projects, ...links };
