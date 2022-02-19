<template>
	<div :style="wrapperStyle">
		<div ref="youtube" :style="wrapperStyle"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import getVideoId from 'get-video-id'

declare global {
	interface Window {
		onYouTubeIframeAPIReadyResolvers?: { (): void }[]
		onYouTubeIframeAPIReady?: { (): void }
		YT: typeof YT
	}
}

export type SuggestedVideoQuality = YT.SuggestedVideoQuality
export type PlayerVars = YT.PlayerVars
const YouTube = defineComponent({
	name: 'YouTube',
	props: {
		src: {
			type: String as PropType<string>,
			required: true
		},
		height: {
			type: [Number, String] as PropType<number | string>,
			default: 360
		},
		width: {
			type: [Number, String] as PropType<number | string>,
			default: 640
		},
		host: {
			type: String as PropType<string>,
			default: 'https://www.youtube.com'
		},
		vars: Object as PropType<PlayerVars>
	},
	computed: {
		id (): string {
			return getVideoId(this.src).id || this.src
		},
		wrapperStyle (): Record<string, string> {
			return {
				width: `${this.width}px`,
				height: `${this.height}px`,
				position: 'relative'
			}
		}
	},
	data () {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		let resolver = () => {
		}
		const promise = new Promise<void>((resolve) => {
			resolver = resolve
		})
		const data: {
			promise: Promise<void>
			resolver: () => void
			player: null | YT.Player
			initiated: boolean
			ready: boolean
			iframeStyle: Record<string, string>
		} = {
			promise,
			resolver,
			player: null,
			initiated: false,
			ready: false,
			iframeStyle: {
				position: 'absolute',
				top: '0',
				left: '0',
				width: '100%',
				height: '100%'
			}
		}
		return data
	},
	mounted () {
		if (!window.onYouTubeIframeAPIReadyResolvers) window.onYouTubeIframeAPIReadyResolvers = []
		if (!window.onYouTubeIframeAPIReady) window.onYouTubeIframeAPIReady = () => {
			window.onYouTubeIframeAPIReadyResolvers?.forEach((resolver: Function) => {
				resolver()
			})
		}
		this.promise.then(() => this.initPlayer())
		const id = 'youtube-iframe-js-api-script'
		let tag = document.getElementById(id) as HTMLScriptElement
		if (!tag) {
			window.onYouTubeIframeAPIReadyResolvers?.push(this.resolver)
			tag = document.createElement('script')
			tag.id = id
			tag.src = 'https://www.youtube.com/iframe_api'
			const firstScriptTag = document.getElementsByTagName('script')[0]
			if (firstScriptTag && firstScriptTag.parentNode) firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
		} else this.resolver()
	},
	methods: {
		initPlayer (): void {
			this.initiated = true
			this.player = new window.YT.Player(this.$refs.youtube as HTMLElement, {
				height: this.height,
				width: this.width,
				videoId: this.id,
				host: this.host,
				playerVars: this.vars,
				events: {
					onReady: (e: any) => {
						this.ready = true
						setTimeout(() => this.$emit('ready', e))
					},
					onStateChange: (e: any) => this.$emit('state-change', e),
					onPlaybackQualityChange: (e: any) => this.$emit('playback-quality-change', e),
					onPlaybackRateChange: (e: any) => this.$emit('playback-rate-change', e),
					onError: (e: any) => this.$emit('error', e),
					onApiChange: (e: any) => this.$emit('api-change', e)
				}
			})
		},
		cueVideoById (videoId: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality): void {
			this.player?.cueVideoById(videoId, startSeconds, suggestedQuality)
		},
		loadVideoById (videoId: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality): void {
			this.player?.loadVideoById(videoId, startSeconds, suggestedQuality)
		},
		cueVideoByUrl (mediaContentUrl: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality): void {
			this.player?.cueVideoByUrl(mediaContentUrl, startSeconds, suggestedQuality)
		},
		loadVideoByUrl (mediaContentUrl: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality): void {
			this.player?.loadVideoByUrl(mediaContentUrl, startSeconds, suggestedQuality)
		},
		cuePlaylist (
			playlist: string | string[],
			index?: number,
			startSeconds?: number,
			suggestedQuality?: SuggestedVideoQuality
		): void {
			this.player?.cuePlaylist(playlist, index, startSeconds, suggestedQuality)
		},
		loadPlaylist (
			playlist: string | string[],
			index?: number,
			startSeconds?: number,
			suggestedQuality?: SuggestedVideoQuality
		): void {
			this.player?.loadPlaylist(playlist, index, startSeconds, suggestedQuality)
		},
		playVideo (): void {
			this.player?.playVideo()
		},
		pauseVideo (): void {
			this.player?.pauseVideo()
		},
		stopVideo (): void {
			this.player?.stopVideo()
		},
		seekTo (seconds: number, allowSeekAhead: boolean): void {
			this.player?.seekTo(seconds, allowSeekAhead)
		},
		nextVideo (): void {
			this.player?.nextVideo()
		},
		previousVideo (): void {
			this.player?.previousVideo()
		},
		playVideoAt (index: number): void {
			this.player?.playVideoAt(index)
		},
		mute (): void {
			this.player?.mute()
		},
		unMute (): void {
			this.player?.unMute()
		},
		isMuted (): boolean {
			return this.player ? this.player.isMuted() : false
		},
		setVolume (volume: number): void {
			this.player?.setVolume(volume)
		},
		getVolume (): number {
			return this.player ? this.player.getVolume() : 0
		},
		getPlaybackRate (): number {
			return this.player ? this.player.getPlaybackRate() : 0
		},
		setPlaybackRate (suggestedRate: number): void {
			this.player?.setPlaybackRate(suggestedRate)
		},
		getAvailablePlaybackRates (): number[] {
			return this.player ? this.player.getAvailablePlaybackRates() : []
		},
		setLoop (loopPlaylists: boolean): void {
			this.player?.setLoop(loopPlaylists)
		},
		setShuffle (shufflePlaylist: boolean): void {
			this.player?.setShuffle(shufflePlaylist)
		},
		getVideoLoadedFraction (): number {
			return this.player ? this.player.getVideoLoadedFraction() : 0
		},
		getPlayerState (): YT.PlayerState {
			return this.player ? this.player.getPlayerState() : YT.PlayerState.UNSTARTED
		},
		getCurrentTime (): number {
			return this.player ? this.player.getCurrentTime() : 0
		},
		getPlaybackQuality (): SuggestedVideoQuality {
			return this.player ? this.player.getPlaybackQuality() : 'default'
		},
		setPlaybackQuality (suggestedQuality: SuggestedVideoQuality): void {
			this.player?.setPlaybackQuality(suggestedQuality)
		},
		getAvailableQualityLevels (): SuggestedVideoQuality[] {
			return this.player ? this.player.getAvailableQualityLevels() : []
		},
		getDuration (): number {
			return this.player ? this.player.getDuration() : 0
		},
		getVideoUrl (): string {
			return this.player ? this.player.getVideoUrl() : ''
		},
		getVideoEmbedCode (): string {
			return this.player ? this.player.getVideoEmbedCode() : ''
		},
		getPlaylist (): string[] {
			return this.player ? this.player.getPlaylist() : []
		},
		istIndex (): number {
			return this.player ? this.player.getPlaylistIndex() : 0
		}
	},
	watch: {
		width () {
			this.player?.setSize(+this.width, +this.height)
		},
		height () {
			this.player?.setSize(+this.width, +this.height)
		},
		src () {
			if (this.initiated && this.player) this.player.loadVideoById(this.id)
		}
	},
	beforeUnmount () {
		this.player?.destroy()
	}
})
export type Methods = (typeof YouTube)['methods']
export default YouTube
</script>
