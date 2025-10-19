<script lang="ts">
	import type { Word } from '$lib/types';

	export let word: Word;
	export let compact = true;
</script>

<div class:compact>
	<p class="faded">{word.type.toLowerCase()}</p>
	{#if word.meaning !== '-'}
		<p class="space">{word.meaning}</p>
	{/if}

	{#if word.adjective !== '-'}
		<p class="space">
			<b>Adj.</b> &middot;
			{word.adjective}
		</p>
	{/if}

	{#if word.verb !== '-'}
		<p class="space">
			<b>Verb</b> &middot;
			{word.verb}
		</p>
	{/if}

	{#if word.adverb !== '-'}
		<p>
			<b>Adv.</b> &middot;
			{word.adverb}
		</p>
	{/if}

	{#if word.preposition !== '-'}
		<p>
			<b>Prep.</b> &middot;
			{word.preposition}
		</p>
	{/if}

	{#if word.antonym}
		<p class="space">
			<b>Antonym</b> &middot;
			{word.antonym}
		</p>
	{/if}

	{#if word.origin && word.origin !== '-'}
		<p class="space">
			<span class="faded"> from </span>
			{word.origin}
		</p>
		<p>
			{word.language} 
		</p>
	{/if}
</div>

<style lang="postcss">
	.space {
		@apply mt-4;
	}

	.compact .space {
		@apply mt-2;
	}
</style>
