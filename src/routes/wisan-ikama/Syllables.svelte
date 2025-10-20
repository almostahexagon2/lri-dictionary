<script lang="ts">
	import type { Word } from '$lib/types';
	import { sortAlphabetically } from '$lib/util';
	import Separator from './Separator.svelte';
	import SyllableSpace from './SyllableSpace.svelte';

	export let words: Word[];

	let useStartingSyllables = false;

	const syllable = /(?:cz|qz|sz|rz|[pbtdkgmnfvszxhwlrjcqaeiouy])/g;

	$: syllableGroups = words.reduce((acc, word) => {
		let syllables = word.word.match(syllable);

		if (syllables) {
			if (useStartingSyllables) {
				syllables = [syllables[0]];
			}

			for (const syllable of syllables) {
				if (acc.has(syllable)) {
					acc.set(syllable, acc.get(syllable)! + 1);
				} else {
					acc.set(syllable, 1);
				}
			}
		}

		return acc;
	}, new Map<string, number>());

	$: maxCount = [...syllableGroups.values()].reduce(
		(acc, count) => Math.max(acc, count),
		0
	);

	const consonants = [
		'',
		'p',
		'b',
		't',
		'd',
		'k',
		'g',
		'm',
		'n',
		'f',
		'v',
		's',
		'z',
		'x',
		'h',
		'w',
		'l',
		'j',
		'c',
		'q',
		'sz',
		'rz',
		'cz',
		'qz'
	].sort(sortAlphabetically);
	const otherConsonants = consonants.slice(1);
	const vowels = [].sort(sortAlphabetically);

	function consonantCount(consonant: string) {
		if (consonant === '') {
			return [...syllableGroups.keys()].reduce((acc, syllable) => {
				if (!otherConsonants.some(c => syllable.startsWith(c))) {
					return acc + syllableGroups.get(syllable)!;
				}

				return acc;
			}, 0);
		}

		return [...syllableGroups.keys()].reduce((acc, syllable) => {
			if (syllable.startsWith(consonant)) {
				return acc + syllableGroups.get(syllable)!;
			}

			return acc;
		}, 0);
	}

	function vowelCount(vowel: string) {
		return [...syllableGroups.keys()].reduce((acc, syllable) => {
			if (syllable.includes(vowel)) {
				return acc + syllableGroups.get(syllable)!;
			}

			return acc;
		}, 0);
	}
</script>

<Separator>Syllables</Separator>

<div class="flex justify-center">
	<button
		class="box px-2 py-1 cursor-pointer transition border-blue-400 dark:border-blue-600
			{useStartingSyllables
			? 'hocus-visible:bg-zinc-100 dark:hocus-visible:bg-zinc-800'
			: 'faded border-opacity-25 dark:border-opacity-25'}"
		on:click={() => (useStartingSyllables = !useStartingSyllables)}
	>
		Starting Syllables Only
	</button>
</div>

<div class="mt-4 w-full overflow-x-auto">
	<div class="grid w-max mx-auto gap-2">
		<div />

		{#each consonants as consonant}
			<p class="px-2 flex justify-between">
				<span class="font-bold">
					{consonant || '∅'}
				</span>

				<span class="faded tabular-nums">
					{consonantCount(consonant)}
				</span>
			</p>
		{/each}

		{#each vowels as vowel}
			<p class="px-2 flex justify-between">
				<span class="font-bold">
					{vowel}
				</span>

				<span class="faded tabular-nums">
					{vowelCount(vowel)}
				</span>
			</p>

			{#each consonants as consonant}
				<div class="flex flex-col gap-1">
					<SyllableSpace
						syllable="{consonant}{vowel}"
						count={syllableGroups.get(`${consonant}${vowel}`) ?? 0}
						{maxCount}
					/>
					<SyllableSpace
						syllable="{consonant}{vowel}n"
						count={syllableGroups.get(`${consonant}${vowel}n`) ?? 0}
						{maxCount}
					/>
				</div>
			{/each}
		{/each}
	</div>
</div>

<style lang="postcss">
	.grid {
		grid-template-columns: repeat(29, minmax(0, 1fr));
	}
</style>
