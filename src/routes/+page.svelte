<script>
	import Header from '@src/layout/Header.svelte';

	import Home from './sections/Home.svelte';
</script>

<svelte:head>
	<style>
		html {
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
<Home />

<style lang="scss">
	@use '@src/theme';
</style>
