import { render } from '@testing-library/svelte';

import Spinner from '$lib/components/Spinner.svelte';

describe('<Spinner />', () => {
	it('renders', () => {
		const { getByTestId } = render(Spinner);
		expect(getByTestId('spinner')).toBeInTheDocument();
	});
});
