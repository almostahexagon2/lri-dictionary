<script lang="ts">
	import { sortAlphabetically } from '$lib/util';
	import { selectedWord } from './stores';

	export let items: Map<string, string[]>;

	$: sorted = [...items.entries()].sort((a, b) =>
		sortAlphabetically(a[0], b[0])
	);
</script>

<table class="w-full">
	{#each sorted as [title, words]}
		<tr class="border-b-2 dark:border-gray-800 last:border-0">
			<th class="py-1 font-semibold text-left align-text-top">
				{title}
			</th>

			<td class="pr-2 py-1 text-right align-text-top faded">
				{words.length}
			</td>

			<td
				class="pl-2 py-1 border-l-2 dark:border-gray-800 align-text-top flex flex-wrap gap-x-2"
			>
				{#each words as word}
					<button
						class="text-blue-500 hocus-visible:text-blue-600 transition"
						on:click={() => {
							if ($selectedWord === word) {
								$selectedWord = '';
							} else {
								$selectedWord = word;
							}
						}}
					>
						{word}
					</button>
				{/each}
			</td>
		</tr>
	{/each}
</table>
