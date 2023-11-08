<script lang="ts">
	import { distance } from 'fastest-levenshtein';

	import type { Word } from '$lib/types';

	import Separator from './Separator.svelte';
	import Table from './Table.svelte';

	export let words: Word[];

	let similarWords = new Map<string, string[]>();

	for (let i = 0; i < words.length; i++) {
		const a = words[i];

		for (let j = i + 1; j < words.length; j++) {
			const b = words[j];

			const score = distance(a.word, b.word);

			if (score < 2) {
				if (similarWords.has(a.word)) {
					similarWords.get(a.word)!.push(b.word);
				} else {
					similarWords.set(a.word, [b.word]);
				}

				if (similarWords.has(b.word)) {
					similarWords.get(b.word)!.push(a.word);
				} else {
					similarWords.set(b.word, [a.word]);
				}
			}
		}
	}
</script>

<Separator>Similar Words</Separator>
<Table items={similarWords} />
