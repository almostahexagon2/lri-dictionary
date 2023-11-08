<script lang="ts">
	import { distance } from 'fastest-levenshtein';

	import { darkMode, savedWritable } from '$lib/stores';
	import {
		wordTypeBorderColors,
		type Word,
		wordTypeTextColors,
		wordTypeBackgroundColors
	} from '$lib/types';

	export let data;

	const view = savedWritable<'normal' | 'compact'>('wordView', 'normal');

	let shownTypes = data.types.slice();

	const normalize = (str: string) =>
		str
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.trim();

	let search = '';
	$: fixedSearch = normalize(search);

	$: scoreMatch = (str: string) => {
		if (!str) return 0;

		const normalized = normalize(str);

		const includes = normalized.includes(fixedSearch);

		if (includes) {
			return str === fixedSearch ? 10 : 1;
		}

		const distanceScore =
			distance(normalized, fixedSearch) / (normalized.length + 1);

		if (distanceScore > 0.5) return 0;

		return 1 - distanceScore;
	};

	$: scoreWord = (word: Word) => {
		return (
			scoreMatch(word.word) * 100 +
			scoreMatch(word.meaning) * 50 +
			scoreMatch(word.noun) * 20 +
			scoreMatch(word.verb) * 20 +
			scoreMatch(word.modifier) * 20 +
			scoreMatch(word.type) * 20 +
			scoreMatch(word.origin) * 20 +
			scoreMatch(word.family) * 20
		);
	};

	$: genericFilteredWords = data.words.filter((word: Word) =>
		shownTypes.includes(word.type)
	);

	$: filteredWords = !fixedSearch
		? genericFilteredWords
		: genericFilteredWords
				.map(word => [word, scoreWord(word)] as [Word, number])
				.filter(([_, score]) => score > 19)
				.sort(([, a], [, b]) => b - a)
				.map(([word]) => word);
</script>

<svelte:head>
	<title>Interactive Kokanu Dictionary</title>

	<meta
		name="description"
		content="Interactive dictionary for the IAL Kokanu."
	/>
	<meta name="keywords" content="kokanu, dictionary, interactive" />

	<meta property="og:title" content="Interactive Kokanu Dictionary" />
	<meta
		property="og:description"
		content="Interactive dictionary for the IAL Kokanu."
	/>
</svelte:head>

<div class="flex justify-between items-center">
	<h1 class="text-3xl font-bold">Kokanu Dictionary</h1>

	<button
		class="interactive p-2"
		on:click={() => {
			darkMode.update(value => !value);
		}}
	>
		{#if $darkMode}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
				/>
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
				/>
			</svg>
		{/if}
	</button>
</div>

<p class="mt-4">This is an interactive dictionary for the IAL Kokanu.</p>

<p class="mt-4">
	<select class="interactive px-2 py-1" bind:value={$view}>
		<option value="normal">Normal View</option>
		<option value="compact">Compact View</option>
	</select>
</p>

<div class="mt-2 flex gap-1 flex-wrap">
	{#each data.types as type}
		{@const active = shownTypes.includes(type)}

		<label
			class="box px-2 py-1 cursor-pointer transition
				{active
				? 'hocus-visible:bg-gray-100 dark:hocus-visible:bg-gray-800'
				: 'faded border-opacity-25 dark:border-opacity-25'}
				{wordTypeBorderColors[type]}"
		>
			<input
				type="checkbox"
				class="sr-only"
				bind:group={shownTypes}
				value={type}
			/>
			{type}
		</label>
	{/each}
</div>

<p class="mt-4">
	<span class="faded">
		{filteredWords.length} /
		{genericFilteredWords.length}
	</span>

	<input
		type="text"
		class="mt-1 block input px-4 py-2"
		placeholder="o jatan..."
		bind:value={search}
	/>
</p>

{#if $view === 'normal'}
	<div class="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each filteredWords as word (word.word)}
			<div class="box relative overflow-hidden p-4">
				<div
					class="w-6 h-6 absolute -top-3 -left-3 rounded-full
						{wordTypeBackgroundColors[word.type]}"
				/>

				<a
					href="/{word.word}"
					class="text-xl hocus-visible:text-blue-500 transition"
				>
					<span class="font-bold">{word.word}</span>
				</a>
				<p class="faded">{word.type.toLowerCase()}</p>
				<p class="mt-2">{word.meaning}</p>

				{#if word.noun !== '-'}
					<p class="mt-2">
						<b>Noun</b> &middot;
						{word.noun}
					</p>
					<p>
						<b>Verb</b> &middot;
						{word.verb}
					</p>
					<p>
						<b>Modifier</b> &middot;
						{word.modifier}
					</p>
				{/if}

				{#if word.origin && word.origin !== '-'}
					<p class="mt-2">
						<span class="faded"> from </span>
						{word.origin}
						{#if word.ipa}
							{word.ipa}
						{/if}
					</p>
					<p>
						{word.family} family
					</p>
				{/if}
			</div>
		{/each}
	</div>
{:else}
	<div class="mt-4 grid">
		{#each filteredWords as word (word.word)}
			<p>
				<a
					href="/{word.word}"
					class="hocus-visible:text-blue-500 transition"
				>
					<span class="font-bold">{word.word}</span>
					&middot;
					<span class="font-bold">{word.likanu}</span>
				</a>
				<span class="text-xs {wordTypeTextColors[word.type]}">
					{word.type.toLowerCase()}
				</span>
				<span>{word.meaning}</span>
			</p>
		{/each}
	</div>
{/if}
