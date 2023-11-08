<script lang="ts">
	import type { Word } from '$lib/types';

	import Separator from './Separator.svelte';
	import Table from './Table.svelte';

	export let words: Word[];

	$: posGroups = words.reduce((acc, word) => {
		if (acc.has(word.type)) {
			acc.get(word.type)!.push(word.word);
		} else {
			acc.set(word.type, [word.word]);
		}

		return acc;
	}, new Map<string, string[]>());
</script>

<Separator>Word Types</Separator>
<Table items={posGroups} />
