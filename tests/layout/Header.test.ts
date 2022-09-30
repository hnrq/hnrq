import Header from '@src/layout/Header.svelte';
import { render } from '@testing-library/svelte';

describe('<Header />', () => {
	it('renders the logo', () => {
		const { getByText } = render(Header);

		expect(getByText('HNRQ')).toBeInTheDocument();
	});

	it.each([
		['Home', '/'],
		['About', '#about'],
		['Posts', '#posts']
	])('renders an anchor to %s section', (label, href) => {
		const { getByText } = render(Header);
		expect(getByText(label)).toBeInTheDocument();
		expect(getByText(label).getAttribute('href')).toBe(href);
	});
});
