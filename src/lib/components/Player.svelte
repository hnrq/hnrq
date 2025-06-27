<script lang="ts">
	import { PUBLIC_YOUTUBE_PLAYLIST_API } from '$env/static/public';
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';

	const volume = new Tween(0, { duration: 2000 });
	let playerContainer: HTMLElement | undefined = $state();
	let player: YT.Player | undefined = $state();
	let isPlaying: boolean = $state(false);
	let videoData: YT.VideoData | undefined = $state();

	const onPlayerReady = (event: { target: YT.Player }) => {
		const playerInstance = event.target;
		const playlist = playerInstance.getPlaylist();
		playerInstance.setVolume(0);
		if (playlist && playlist.length > 0) {
			const randomIndex = Math.floor(Math.random() * playlist.length);
			playerInstance.cueVideoById(playlist[randomIndex]);
		}
	};

	const onPlayerStateChange = (event: { data: number; target: YT.Player }) => {
		const playerState = event.data;
		const playerInstance = event.target;

		if (playerState === window.YT.PlayerState.PLAYING) {
			volume.set(50);
			isPlaying = true;
		} else if (
			playerState === window.YT.PlayerState.PAUSED ||
			playerState === window.YT.PlayerState.ENDED
		) {
			volume.set(0);
			isPlaying = false;
		} else if (playerState === window.YT.PlayerState.CUED)
			videoData = playerInstance.getVideoData();
	};

	const onYouTubeIframeAPIReady = () => {
		if (!playerContainer) {
			console.error('YouTube Player container not found.');
			return;
		}

		player = new window.YT.Player(playerContainer, {
			height: '1',
			width: '1',
			playerVars: {
				listType: 'playlist',
				list: PUBLIC_YOUTUBE_PLAYLIST_API,
				autoplay: 0,
				controls: 0, // Hide all controls
				rel: 0,
				showinfo: 0,
				iv_load_policy: 3,
				modestbranding: 1,
				origin: window.location.origin
			},
			events: {
				onReady: onPlayerReady,
				onStateChange: onPlayerStateChange
			}
		});
	};

	// --- Audio and Control Logic ---
	onMount(() => {
		// @ts-expect-error: this should be passed to the window object by the YouTube API script
		window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

		if (window.YT && window.YT.Player) {
			onYouTubeIframeAPIReady();
		} else {
			const tag = document.createElement('script');
			tag.src = 'https://www.youtube.com/iframe_api';
			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
		}

		return () => {
			if (player && typeof player.destroy === 'function') player.destroy();
			// @ts-expect-error: this should be passed to the window object by the YouTube API script
			if (window.onYouTubeIframeAPIReady === onYouTubeIframeAPIReady) {
				// @ts-expect-error: this should be passed to the window object by the YouTube API script
				delete window.onYouTubeIframeAPIReady;
			}
		};
	});

	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		volume.current;
		player?.setVolume?.(volume.current);
	});
</script>

<div class="absolute -top-[9999px] -left-[9999px] w-px h-px overflow-hidden">
	<div bind:this={playerContainer}></div>
</div>

{#if player && videoData}
	<div class="text-neutral-200">
		<div class="flex justify-center items-center gap-2">
			<button onclick={() => player?.previousVideo()} class="cursor-pointer" aria-label="Previous">
				<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
					<path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
				</svg>
			</button>

			{#if !isPlaying}
				<button onclick={() => player?.playVideo()} class="cursor-pointer" aria-label="Play">
					<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg
					>
				</button>
			{:else}
				<button onclick={() => player?.pauseVideo()} class="cursor-pointer" aria-label="Pause">
					<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
						<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
					</svg>
				</button>
			{/if}

			<button onclick={() => player?.previousVideo()} class="cursor-pointer" aria-label="Next">
				<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
					<path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
				</svg>
			</button>
			<span>|</span>
			<div class="text-sm font-semibold mt-1">
				{videoData?.title}
			</div>
		</div>
	</div>
{/if}
