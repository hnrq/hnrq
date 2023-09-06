import { faker } from '@faker-js/faker';
import Skillbar from '$lib/components/Skillbar.svelte';
import { render } from '@testing-library/svelte';

describe('<Skillbar />', () => {
	it('renders a label', () => {
		const skillbar = { label: faker.word.noun(), value: faker.datatype.float(10) };
		const { getByText } = render(Skillbar, skillbar);

		expect(getByText(skillbar.label)).toBeInTheDocument();
	});

	it('receives a value from 0 to 10', () => {
		const skillbar = { label: faker.word.noun(), value: faker.datatype.float(10) };
		const { getByText } = render(Skillbar, skillbar);

		expect(getByText(`${skillbar.value}/10`)).toBeInTheDocument();
	});

	it('renders the skill bar with the width based on the value', () => {
		const skillbar = { label: faker.word.noun(), value: faker.datatype.float(10) };
		const { getByTestId } = render(Skillbar, skillbar);

		expect(getByTestId('skillbar__bar').style.width).toBe(`${skillbar.value * 10}%`);
	});
});
