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

<div class="bg-kokanu dark:bg-kokanu-dark flex">
	<div class="w-full wrapper flex flex-wrap">
		<a href="/" class="flex pt-4">
			<img
				src="/banner.png"
				alt=""
				width="204"
				height="80"
				class="mt-auto"
			/>
		</a>

		<a
			href="https://kokanu.com"
			class="ml-auto mt-auto mb-4 text-sm flex text-white hocus:text-blue-200 transition"
		>
			kokanu.com
		</a>
	</div>
</div>

<div class="wrapper mt-8 mb-32">
	<slot />
</div>
