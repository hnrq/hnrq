<script lang="ts">
	import media from '@src/assets/media';
	import skills from '@src/assets/skills';
	import Link from '@src/components/Link.svelte';
	import Skillbar from '@src/components/Skillbar.svelte';
	import Section from '@src/layout/Section.svelte';
	import { fade } from 'svelte/transition';
</script>

<Section id="about" revealOnScroll style={`height: calc(100vh - 132px);`}>
	<div class="about container">
		<h2 class="about__title">ABOUT <br /> ME</h2>
		<div class="about__summary">
			<span class="about__summary-info">
				<b>Name:</b> Henrique Alberone Ramos
			</span>
			<span class="about__summary-info">
				<b>Birthdate:</b> August 21st, 1999
			</span>
			<span class="about__summary-info">
				<b>Works as:</b> Front-end Developer
			</span>
			<span class="about__info">
				<b>Lives in:</b> Belo Horizonte, Brazil
			</span>
			<div class="about__links">
				{#each Object.entries(media).slice(0, 4) as [label, url]}
					<small class="about__link"><Link href={url}>{label}</Link></small>
				{/each}
			</div>
		</div>
		<div class="about__skills">
			{#each Object.entries(skills) as [label, value], index}
				<div transition:fade={{ delay: 500 * (index + 1), duration: 500 }}>
					<Skillbar {label} {value} />
				</div>
			{/each}
		</div>
		<div class="about__bio">
			<h4 class="about__bio-title">Bio:</h4>
			<p>
				Software Engineer who spends his spare time trying to learn something new about Web, Mobile
				Development and UI/UX design. Likes video editing, muddling through Illustrator and loses
				his by playing Dota 2. Also writes about his programming misadventures on{' '}
				<a href={media['Dev.to']} target="_blank" rel="noopener noreferrer" class="link">
					Dev.to
				</a>
				.
			</p>
		</div>
	</div>
</Section>

<style lang="scss">
	@use '@src/theme/utils';
	@use '@src/theme/components/container';

	.about {
		display: grid;
		grid-template: auto 1fr / repeat(2, 1fr);
		grid-gap: utils.spacing(4);

		@include utils.breakpoint-down('sm') {
			display: flex;
			flex-direction: column;
		}
		&__title {
			text-align: right;
			grid-area: 1 / 1;
			margin: 0;
		}

		&__bio-title {
			margin-top: 0;
			margin-bottom: utils.spacing(1);
		}

		&__summary {
			display: flex;
			padding-top: utils.spacing(2);
			flex-direction: column;
			grid-area: 1 / 2;
		}

		&__skills {
			display: flex;
			flex-direction: column;
			row-gap: utils.spacing(1);
		}

		&__links {
			margin-top: auto;
			display: flex;
			gap: utils.spacing(2);
		}

		&__link {
			font-weight: 700;
		}
	}
</style>
