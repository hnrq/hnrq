import Spinner from '$lib/components/Spinner.svelte';
import { render } from '@testing-library/svelte';

describe('<Spinner />', () => {
	it('renders', () => {
		const { getByTestId } = render(Spinner);
		expect(getByTestId('spinner')).toBeInTheDocument();
	});
});
