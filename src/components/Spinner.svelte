<div class="spinner" data-testid="spinner" />

<style lang="scss">
	@use '@src/theme/utils';

	.spinner {
		width: utils.spacing(5);
		margin: utils.spacing(1) auto 0;
		display: block;
		transform: scaleX(0);
		transform-origin: 0 50%;
		height: utils.spacing(2);
		background-color: white;
		animation: 1.6s ease infinite mouse-wheel;
		animation-delay: 500ms;
	}

	@keyframes loading {
		0%,
		30% {
			transform-origin: 0 50%;
		}
		40%,
		70% {
			transform-origin: 100% 50%;
		}
		40% {
			transform: scaleX(1);
		}
		70% {
			transform: scaleX(0);
		}
		100% {
			transform: scaleX(0);
		}
	}
</style>
