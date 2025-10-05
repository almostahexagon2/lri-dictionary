<script lang="ts">
	export let syllable: string;
	export let count: number;
	export let maxCount: number;
</script>

<p
	class="px-2 py-1 flex gap-1 justify-between rounded-xl {!count
		? 'bg-zinc-100 faded dark:bg-zinc-900'
		: 'background'}"
	style:--proportion={count / maxCount}
>
	{syllable}

	{#if count}
		<span>
			{count}
		</span>
	{/if}
</p>

<style>
	p.background {
		background: hsl(180, 50%, calc(90% - var(--proportion) * 40%));
	}

	:global(.dark) p.background {
		background: hsl(180, 50%, calc(10% + var(--proportion) * 40%));
	}
</style>
