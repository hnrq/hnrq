<script lang="ts">
	export let label: string;
	export let value: number;
</script>

<div class="skillbar">
	<span class="skillbar__label">{label}</span>
	<span class="skillbar__value">{value}/10</span>

	<div class="skillbar__bar-container">
		<div class="skillbar__bar" data-testid="skillbar__bar" style={`width: ${value * 10}%`} />
	</div>
</div>

<style lang="scss">
	@use '@src/theme/utils';
	$border-width: 2px;

	.skillbar {
		display: grid;
		row-gap: utils.spacing(1);
		grid-template: 2fr / 2fr;
		box-sizing: border-box;
		font-family: var(--body-font);

		&__label {
			grid-area: 1 / 1;
		}

		&__value {
			grid-area: 1 / 2;
		}

		&__bar-container {
			grid-area: 2 / span 2;
			border: $border-width solid var(--primary-color);
			position: relative;
			box-sizing: border-box;
			height: utils.spacing(5);
			width: 100%;
		}

		&__bar {
			height: utils.spacing(5);
			position: absolute;
			left: -#{calc($border-width / 2)};
			top: -#{calc($border-width)};
			background-color: var(--primary-color);
		}
	}
</style>
