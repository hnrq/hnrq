import { writable } from 'svelte/store';
import type { PortfolioItem } from '$lib/data';

export const selectedCD = writable<PortfolioItem | null>(null);

export const rackRotation = writable(0);
