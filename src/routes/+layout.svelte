<script>
	import Header from '$lib/layout/Header.svelte';
</script>

<svelte:head>
	<script>
		if ('theme' in localStorage) document.documentElement.classList.add(localStorage.theme);
		else
			document.documentElement.classList.add(
				window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
			);
	</script>

	<style>
		body {
			font-family: var(--body-font);
			font-size: 18px;
			background: var(--background-color);
			color: var(--text-color);
			box-sizing: border-box;
		}

		@media only screen and (max-width: 600px) {
			html {
				font-size: 14px;
			}
		}

		body {
			margin: 0;
		}
	</style>
</svelte:head>

<Header />
<slot />
