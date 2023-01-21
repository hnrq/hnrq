<script lang="ts">
	import PixelatePass from '@src/assets/postprocessing/PixelatePass';
	import RenderPixelatedPass from '@src/assets/postprocessing/RenderPixelatedPass';
	import { Pass, useThrelte } from '@threlte/core';
	import { Vector2 } from 'three';

	const { camera, scene } = useThrelte();

	export let pixelSize: number = 2;
	let screenResolution = new Vector2(window.innerWidth, window.innerHeight);
	let renderResolution = screenResolution.clone().divideScalar(pixelSize);
	renderResolution.x |= 0;
	renderResolution.y |= 0;
</script>

<Pass pass={new RenderPixelatedPass(renderResolution, scene, $camera)} />
<Pass pass={new PixelatePass(renderResolution)} />
