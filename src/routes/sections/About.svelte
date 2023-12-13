<script lang="ts">
	import media from '$lib/assets/media';
	import Link from '$lib/components/Link.svelte';
	import Section from '$lib/layout/Section.svelte';
</script>

<Section id="about" revealOnScroll>
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
		<div class="about__bio">
			<h4 class="about__bio-title">Bio:</h4>
			<p>
				I'm a Front-end software engineer who aims to create products with great User Experience. I
				believe a good UX, along with an eye-catching User Interface, is what stands out first for
				the customer. By working closely together with designers, developers and customers, I strive
				to create out-of-the-box experiences, using a test-first approach for creating performant
				and re-usable components joyful interfaces. I also write sometimes to{' '}
				<a href={media['Dev.to']} target="_blank" rel="noopener noreferrer" class="about__link">
					Dev.to
				</a>
				.
			</p>
		</div>
	</div>
</Section>

<style lang="scss">
	@use '$lib/theme/utils';
	@use '$lib/theme/components/container';

	.about {
		display: grid;
		grid-template: auto 1fr / repeat(2, 1fr);
		gap: utils.spacing(4);

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
			grid-area: span 1 / 2;
		}

		&__bio {
			grid-area: 2 / 2;
		}

		&__links {
			margin-top: auto;
			display: flex;
			gap: utils.spacing(2);
		}

		&__link {
			color: var(--text-color);
			font-weight: 700;
		}
	}
</style>
