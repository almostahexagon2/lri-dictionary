<script>
	import '../app.postcss';

	import { darkMode } from '$lib/stores';
	import { browser } from '$app/environment';

	darkMode.subscribe(value => {
		if (
			!browser ||
			document.documentElement.classList.contains('dark') === value
		) {
			return;
		}

		document.documentElement.classList.add('no-transition');
		document.documentElement.classList.toggle('dark', value);

		// Force a reflow to make sure the transition is triggered
		document.documentElement.offsetWidth;

		document.documentElement.classList.remove('no-transition');
	});
</script>

<svelte:head>
	<script>
		if (localStorage.getItem('kokanu:darkMode') === null) {
			localStorage.setItem(
				'kokanu:darkMode',
				window
					.matchMedia('(prefers-color-scheme: dark)')
					.matches.toString()
			);
		}

		document.documentElement.classList.toggle(
			'dark',
			localStorage.getItem('kokanu:darkMode') === 'true'
		);
	</script>
</svelte:head>

<div class="h-24 bg-kokanu dark:bg-kokanu-dark flex">
	<div class="w-full wrapper flex items-end">
		<img src="/banner.png" alt="" width="204" height="80" />
	</div>
</div>

<div class="wrapper mt-12 mb-32">
	<slot />
</div>
