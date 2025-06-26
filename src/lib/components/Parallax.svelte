<script lang="ts">
	import { cursorPosition } from '$lib/stores/index.svelte';
	import { useTask } from '@threlte/core';
	import { onMount } from 'svelte';

	onMount(() => {
		const handleMouseMove = (event: MouseEvent) => {
			const rect = document.body.getBoundingClientRect();
			cursorPosition.set([
				((event.clientX - rect.left) / rect.width) * 2 - 1,
				-((event.clientY - rect.top) / rect.height) * 2 + 1
			]);
		};

		document.addEventListener('mousemove', handleMouseMove);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
		};
	});

	useTask(() => {
		document.body.style.setProperty('--parallax-x', `${-cursorPosition.current[0] * 10}px`);
		document.body.style.setProperty('--parallax-y', `${cursorPosition.current[1] * 10}px`);
	});
</script>
