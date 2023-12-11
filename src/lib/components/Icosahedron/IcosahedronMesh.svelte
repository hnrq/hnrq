<script lang="ts">
	import { T, useRender, useThrelte } from '@threlte/core';
	import { MeshLambertMaterial, IcosahedronGeometry, type Camera } from 'three';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
	import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js';

	const { scene, renderer, camera, size } = useThrelte();

	const composer = new EffectComposer(renderer);
	const setupEffectComposer = (camera: Camera) => {
		composer.addPass(new RenderPass(scene, camera));

		const effect = new ShaderPass(DotScreenShader);
		effect.uniforms['scale'].value = 1;
		composer.addPass(effect);
	};

	$: setupEffectComposer($camera);
	$: composer.setSize($size.width, $size.height);

	useRender((_, delta) => {
		composer.render(delta);
	});
</script>

<T.HemisphereLight groundColor={0x00000c} intensity={1.5} />
<T.Mesh material={new MeshLambertMaterial()} geometry={new IcosahedronGeometry(3)} />
