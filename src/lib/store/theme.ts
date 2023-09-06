import { writable } from 'svelte/store';

import { browser } from '$app/environment';

type Theme = 'dark' | 'light';

let stored;
if (browser) stored = localStorage.theme ?? 'dark';

const store = writable<Theme>(stored);

if (browser)
	store.subscribe((value: Theme) => {
		document.documentElement.classList.remove(value === 'light' ? 'dark' : 'light');
		document.documentElement.classList.add(value);
		localStorage.theme = value;
	});

export default store;
