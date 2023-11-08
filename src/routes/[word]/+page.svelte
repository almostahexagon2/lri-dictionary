<script lang="ts">
	import { darkMode } from '$lib/stores.js';

	export let data;

	$: description = `${data.word.meaning}${
		data.word.noun && data.word.noun !== '-'
			? '\n\nNoun · ' +
			  data.word.noun +
			  '\nVerb · ' +
			  data.word.verb +
			  '\nModifier · ' +
			  data.word.modifier
			: ''
	}${
		data.word.origin && data.word.origin !== '-'
			? '\n\nfrom ' +
			  data.word.origin +
			  ' ' +
			  data.word.ipa +
			  '\n' +
			  data.word.family +
			  ' family'
			: ''
	}`;
</script>

<svelte:head>
	<title>{data.word} &middot; {data.word.likanu} | Kokanu</title>

	<meta name="description" content={data.word.meaning} />
	<meta name="keywords" content={data.word.word} />

	<meta property="og:title" content={data.word.word} />
	<meta property="og:description" content={description} />
</svelte:head>

<div class="flex justify-between items-center">
	<h1 class="text-3xl font-bold">
		{data.word.word} &middot; {data.word.likanu}
	</h1>

	<div class="flex gap-2">
		<a href="/" class="interactive p-2">
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
					d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
				/>
			</svg>
		</a>

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
</div>

<p class="mt-4 faded">
	{data.word.type}
</p>

<p class="mt-4">
	{data.word.meaning}
</p>

{#if data.word.noun !== '-'}
	<p class="mt-4">
		<b>Noun</b> &middot;
		{data.word.noun}
	</p>
	<p>
		<b>Verb</b> &middot;
		{data.word.verb}
	</p>
	<p>
		<b>Modifier</b> &middot;
		{data.word.modifier}
	</p>
{/if}

{#if data.word.origin && data.word.origin !== '-'}
	<p class="mt-4">
		<span class="faded"> from </span>
		{data.word.origin}
		{#if data.word.ipa}
			{data.word.ipa}
		{/if}
	</p>
	<p>
		{data.word.family} family
	</p>
{/if}
