<script lang="ts">
	import Link from '@src/components/Link.svelte';
	import theme from '@src/store/theme';
</script>

<header class="header">
	<div class="header__logo">
		<span>HNRQ</span>
	</div>
	<nav class="header__nav">
		<Link href="/">Home</Link>
		<Link href="/#about">About</Link>
		<Link href="/#posts">Posts</Link>
	</nav>
	<span
		class="header__theme-toggle"
		on:click={() => theme.update((curr) => (curr === 'dark' ? 'light' : 'dark'))}
	>
		TURN {#if $theme === 'dark'}ON{:else}OFF{/if}
	</span>
</header>

<style lang="scss">
	@use '@src/theme/utils';

	.header {
		padding-top: utils.spacing(3);
		padding-bottom: utils.spacing(2);
		gap: utils.spacing(1.5);
		position: sticky;
		display: flex;
		z-index: 2;
		top: 0;
		box-sizing: border-box;
		justify-items: center;
		flex-direction: column;
		width: 100%;
		align-items: center;
		background-color: var(--background-color);

		&__nav {
			display: flex;
			gap: utils.spacing(4);
		}

		&__logo {
			font-size: 1.2rem;
		}

		&__theme-toggle {
			cursor: pointer;
		}
	}
</style>
