<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	export let href: string;

	let active = false;

	$: if (browser) {
		active = $page.url.href.replace($page.url.origin, '') === href;
	}
</script>

<a {href} class="link" class:active>
	<slot />
</a>

<style lang="scss">
	.link {
		position: relative;
		text-decoration: none;
		text-transform: uppercase;
		z-index: 1;
		transition: cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.2s color;
		color: var(--text-color);
		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			transition: cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.2s width;
			background-color: var(--primary-color);
			width: 0;
			height: 100%;
		}
		&:hover {
			cursor: pointer;
			color: var(--background-color);
			&:before {
				width: 100%;
			}
		}
		&.active {
			color: var(--background-color);
			&:before {
				width: 100%;
			}
		}
	}
</style>
