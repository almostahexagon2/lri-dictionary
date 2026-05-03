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

	{#if word.noun !== '-'}
		<p class="space">
			<b>{word.word}o</b> &middot;
			{word.noun}
		</p>
	{/if}

	{#if word.adjective !== '-'}
		<p class="space">
			<b>{word.word}a</b> &middot;
			{word.adjective}
		</p>
	{/if}

	{#if word.uverb !== '-'}
		<p class="space">
			<b>{word.word}u</b> &middot;
			{word.uverb}
		</p>
	{/if}

	{#if word.everb !== '-'}
		<p class="space">
			<b>{word.word}e</b> &middot;
			{word.everb}
		</p>
	{/if}

	{#if word.usuverb !== '-'}
		<p class="space">
			<b>{word.word}usu</b> &middot;
			{word.usuverb}
		</p>
	{/if}

<!--
{#if word.adverb !== '-'}
		<p>
			<b>Adv.</b> &middot;
			{word.adverb}
		</p>
	{/if}
-->

	{#if word.preposition !== '-'}
		<p>
			<b>{word.word}</b> &middot;
			{word.preposition}
		</p>
	{/if}

	{#if word.malroot}
		<p class="space">
			<b>naj{word.word}</b> &middot;
			{word.malroot}
		</p>
	{/if}

	{#if word.origin && word.origin !== '-'}
		<p class="space">
			{word.origin}
			<span class="faded"> from </span>
		</p>
		<p>
			{word.language} 
		</p>
	{/if}
	{#if word.extra}
		<p class="space">
			<b>Extra: </b>
			{word.extra}
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
