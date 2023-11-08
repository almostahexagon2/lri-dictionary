import type { Word } from '$lib/types';

export function load({ fetch }) {
	return {
		words: fetch('/data').then(r => r.json()) as Promise<Word[]>
	};
}
