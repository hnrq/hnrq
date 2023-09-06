import { render } from '@testing-library/svelte';

import Header from '$lib/layout/Header.svelte';

describe('<Header />', () => {
	it('renders the logo', () => {
		const { getByText } = render(Header);

		expect(getByText('HNRQ')).toBeInTheDocument();
	});

	it.each([
		['Home', '/'],
		['About', '/#about'],
		['Posts', '/#posts']
	])('renders an anchor to %s section', (label, href) => {
		const { getByText } = render(Header);
		expect(getByText(label)).toBeInTheDocument();
		expect(getByText(label).getAttribute('href')).toBe(href);
	});
});
