<script lang="ts">
	import media from '@src/assets/media';
	import skills from '@src/assets/skills';
	import Link from '@src/components/Link.svelte';
	import Skillbar from '@src/components/Skillbar.svelte';
	import Section from '@src/layout/Section.svelte';
	import { fade } from 'svelte/transition';
</script>

<Section id="about" revealOnScroll>
	<h1 class="about__title">ABOUT <br /> ME</h1>
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
			{#each media.slice(0, 4) as { label, url }}
				<small class="about__link"><Link href={url}>{label}</Link></small>
			{/each}
		</div>
		<div class="about__skills">
			{#each skills as { label, value }, index}
				<div in:fade={{ delay: 500 * (index + 1), duration: 500 }}>
					<Skillbar {label} {value} />
				</div>
			{/each}
		</div>
	</div>
</Section>

<style lang="scss">
	@use '@src/theme/utils';

	.about {
		&__title {
			text-align: right;
		}

		&__summary {
			display: flex;
			flex-direction: column;
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
