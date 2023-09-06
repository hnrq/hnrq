<script>
	import Icosahedron from '$lib/components/Icosahedron.svelte';
	import Section from '$lib/layout/Section.svelte';

	import { browser } from '$app/environment';
</script>

<Section id="" style={`height: calc(100vh - 132px); min-height: initial;`}>
	<div class="home container">
		<div class="home__title">
			<h1 class="title--reveal">WRITING</h1>
			<h1 class="title--reveal">ART</h1>
			<h1 class="title--reveal">MAKING</h1>
			<h1 class="title--reveal">CODE</h1>
		</div>
		<div class="home__figure">
			{#if browser}
				<Icosahedron />
			{/if}
		</div>

		<div class="home__footer">
			<span class="mb-4">Coding since 2017.</span>
			<div class="mouse-wheel" />
		</div>
	</div>
</Section>

<style lang="scss">
	@use '$lib/theme/utils';
	@use '$lib/theme/components/container';

	$delay: 500ms;
	$duration: 800ms;

	.home {
		height: 100%;
		display: grid;
		grid-template: auto 1fr / 50% 50%;
		position: relative;
		height: 100%;
		align-content: space-around;

		&__footer {
			display: flex;
			flex-direction: column;
			align-items: center;
			grid-row: 2;
			grid-column: span 2;
			margin: auto 0;
		}

		&__figure {
			grid-column: 2;
			right: 0;
			top: 0;
			bottom: 0;
			@include utils.breakpoint-down('md') {
				position: absolute;
			}
		}

		&__title {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin: auto 0;
			@include utils.breakpoint-down('sm') {
				margin-top: utils.spacing(4);
			}
			grid-column: 1;
		}

		& .title--reveal,
		& .title--reveal:after {
			animation-fill-mode: both;
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);

			white-space: nowrap;
			cursor: default;
		}
		@for $i from 1 through 4 {
			& .title--reveal:nth-child(#{$i}),
			& .title--reveal:nth-child(#{$i}):after {
				animation-delay: ($duration * $i);
				animation-iteration-count: 1;
				animation-duration: $duration;
			}
		}
		& .mouse-wheel {
			height: utils.spacing(5);
			margin: utils.spacing(1) auto 0;
			display: block;
			transform: scaleY(0);
			width: utils.spacing(1);
			background-color: var(--primary-color);
			animation: 1.6s ease infinite mouse-wheel;
			animation-delay: 500ms;
		}

		& .title--reveal {
			display: inline-block;
			position: relative;
			z-index: 1;
			margin: 0 0 utils.spacing(1) 0;
			letter-spacing: utils.spacing(1);
			animation-name: clip-text;
			white-space: nowrap;
			cursor: default;
			&:nth-child(odd) {
				font-weight: 700;
			}
			&:nth-child(2),
			&:nth-child(3) {
				font-weight: 200;
			}
			&:after {
				content: '';
				position: absolute;
				z-index: 5;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: var(--primary-color);
				transform: scaleX(0);
				transform-origin: 0 50%;
				pointer-events: none;
				animation-name: text-revealer;
			}
		}
	}

	@keyframes mouse-wheel {
		0%,
		30% {
			transform-origin: 50% 0;
		}
		40%,
		70% {
			transform-origin: 50% 100%;
		}
		40% {
			transform: scaleY(1);
		}
		70% {
			transform: scaleY(0);
		}
		100% {
			transform: scaleY(0);
		}
	}

	@keyframes clip-text {
		from {
			clip-path: inset(0 100% 0 0);
		}
		to {
			clip-path: inset(0 0 0 0);
		}
	}

	@keyframes text-revealer {
		0%,
		50% {
			transform-origin: 0 50%;
		}
		60%,
		100% {
			transform-origin: 100% 50%;
		}
		60% {
			transform: scaleX(1);
		}
		100% {
			transform: scaleX(0);
		}
	}
</style>
