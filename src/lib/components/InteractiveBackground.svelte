<script lang="ts">
	import { T } from '@threlte/core';
	import type { InteractivityProps } from '@threlte/extras';

	let props: InteractivityProps = $props();
</script>

<T.Mesh {...props} visible={false} onclick={props.onclick} position.z={-10} scale={100}>
	<T.PlaneGeometry />
</T.Mesh>
