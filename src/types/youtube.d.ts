declare namespace YT {
	export const enum PlayerState {
		UNSTARTED = -1,
		ENDED = 0,
		PLAYING = 1,
		PAUSED = 2,
		BUFFERING = 3,
		CUED = 5
	}

	export const enum PlayerError {
		InvalidParam = 2,
		Html5Error = 5,
		VideoNotFound = 100,
		EmbeddingNotAllowed = 101,
		EmbeddingNotAllowed2 = 150
	}

	export const enum AutoHide {
		AlwaysVisible = 0,
		HideAllControls = 1,
		HideProgressBar = 2
	}

	export const enum AutoPlay {
		NoAutoPlay = 0,
		AutoPlay = 1
	}

	export const enum ClosedCaptionsLoadPolicy {
		UserDefault = 0,
		ForceOn = 1
	}

	export type ProgressBarColor = 'red' | 'white';

	export const enum Controls {
		Hide = 0,
		ShowLoadPlayer = 1,
		ShowDelayLoadPlayer = 2
	}

	export const enum KeyboardControls {
		Enable = 0,
		Disable = 1
	}

	export const enum JsApi {
		Disable = 0,
		Enable = 1
	}

	export const enum FullscreenButton {
		Hide = 0,
		Show = 1
	}

	export const enum IvLoadPolicy {
		Show = 1,
		Hide = 3
	}

	export type ListType = ListTypePlayer | ListTypeSearch | ListTypeUserUploads;

	export type ListTypePlayer = 'player';

	export type ListTypeSearch = 'search';

	export type ListTypeUserUploads = 'user_uploads';

	export const enum Loop {
		SinglePlay = 0,
		Loop = 1
	}

	export const enum ModestBranding {
		Full = 0,
		Modest = 1
	}

	export const enum PlaysInline {
		Fullscreen = 0,
		Inline = 1
	}

	export const enum RelatedVideos {
		Hide = 0,
		Show = 1
	}

	export const enum ShowInfo {
		Hide = 0,
		Show = 1
	}

	export interface PlayerEvent {
		target: Player;
	}

	export interface OnStateChangeEvent extends PlayerEvent {
		data: PlayerState;
	}

	export interface OnPlaybackQualityChangeEvent extends PlayerEvent {
		data: string;
	}

	export interface OnPlaybackRateChangeEvent extends PlayerEvent {
		data: number;
	}

	export interface OnErrorEvent extends PlayerEvent {
		data: PlayerError;
	}

	export interface PlayerEventHandler<TEvent extends PlayerEvent> {
		(event: TEvent): void;
	}

	export interface PlayerOptions {
		width?: string | number;
		height?: string | number;
		videoId?: string;
		playerVars?: PlayerVars;
		events?: Events;
		host?: string;
	}

	export type SuggestedVideoQuality = (
		VideoQualityDefault
		| VideoQualitySmall
		| VideoQualityMedium
		| VideoQualityLarge
		| VideoQualityHD720
		| VideoQualityHD1080
		| VideoQualityHighRes);

	export type VideoQualityDefault = 'default';

	export type VideoQualitySmall = 'small';

	export type VideoQualityMedium = 'medium';

	export type VideoQualityLarge = 'large';

	export type VideoQualityHD720 = 'hd720';

	export type VideoQualityHD1080 = 'hd1080';

	export type VideoQualityHighRes = 'highres';

	export interface PlayerVars {
		autohide?: AutoHide;
		autoplay?: AutoPlay;
		cc_load_policy?: ClosedCaptionsLoadPolicy;
		color?: ProgressBarColor;
		controls?: Controls;
		disablekb?: KeyboardControls;
		enablejsapi?: JsApi;
		end?: number;
		fs?: FullscreenButton;
		hl?: string;
		iv_load_policy?: IvLoadPolicy;
		list?: string;
		listType?: ListType;
		loop?: Loop;
		modestbranding?: ModestBranding;
		origin?: string;
		playlist?: string;
		playsinline?: PlaysInline;
		rel?: RelatedVideos;
		showinfo?: ShowInfo;
		start?: number;
	}

	export interface Events {
		onReady?: PlayerEventHandler<PlayerEvent>;
		onStateChange?: PlayerEventHandler<OnStateChangeEvent>;
		onPlaybackQualityChange?: PlayerEventHandler<OnPlaybackQualityChangeEvent>;
		onPlaybackRateChange?: PlayerEventHandler<OnPlaybackRateChangeEvent>;
		onError?: PlayerEventHandler<OnErrorEvent>;
		onApiChange?: PlayerEventHandler<PlayerEvent>;
	}

	export interface VideoOrPlaylistSettings {
		startSeconds?: number;
		endSeconds?: number;
		suggestedQuality?: SuggestedVideoQuality
	}

	export interface VideoByIdSettings extends VideoOrPlaylistSettings {
		videoId: string;
	}

	export interface VideoByMediaContentUrlSettings extends VideoOrPlaylistSettings {
		mediaContentUrl: string;
	}

	export interface IPlaylistSettings extends VideoOrPlaylistSettings {
		list: string;
		listType?: ListType;
		index?: number;
	}

	export class Player {
		constructor (elt: HTMLElement, options: PlayerOptions);
		constructor (id: string, options: PlayerOptions);

		cueVideoById (videoId: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality): void;
		cueVideoById (args: VideoByIdSettings): void;

		loadVideoById (videoId: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality): void;
		loadVideoById (args: VideoByIdSettings): void;

		cueVideoByUrl (mediaContentUrl: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality): void;
		cueVideoByUrl (args: VideoByMediaContentUrlSettings): void;

		loadVideoByUrl (mediaContentUrl: string, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality): void;
		loadVideoByUrl (args: { mediaContentUrl: string; startSeconds?: number; endSeconds?: number; suggestedQuality?: SuggestedVideoQuality }): void;

		cuePlaylist (playlist: string | string[], index?: number, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality): void;
		cuePlaylist (args: IPlaylistSettings): void;

		loadPlaylist (playlist: string | string[], index?: number, startSeconds?: number, suggestedQuality?: SuggestedVideoQuality): void;
		loadPlaylist (args: IPlaylistSettings): void;

		playVideo (): void;

		pauseVideo (): void;

		stopVideo (): void;

		seekTo (seconds: number, allowSeekAhead: boolean): void;

		nextVideo (): void;

		previousVideo (): void;

		playVideoAt (index: number): void;

		mute (): void;

		unMute (): void;

		isMuted (): boolean;

		setVolume (volume: number): void;

		getVolume (): number;

		setSize (width: number, height: number): void;

		getPlaybackRate (): number;

		setPlaybackRate (suggestedRate: number): void;

		getAvailablePlaybackRates (): number[];

		setLoop (loopPlaylists: boolean): void;

		setShuffle (shufflePlaylist: boolean): void;

		getVideoLoadedFraction (): number;

		getPlayerState (): PlayerState;

		getCurrentTime (): number;

		getPlaybackQuality (): SuggestedVideoQuality;

		setPlaybackQuality (suggestedQuality: SuggestedVideoQuality): void;

		getAvailableQualityLevels (): SuggestedVideoQuality[];

		getDuration (): number;

		getVideoUrl (): string;

		getVideoEmbedCode (): string;

		getPlaylist (): string[];

		getPlaylistIndex (): number;

		addEventListener<TEvent extends PlayerEvent> (eventName: keyof Events, listener: (event: TEvent) => void): void;

		removeEventListener<TEvent extends PlayerEvent> (eventName: keyof Events, listener: (event: TEvent) => void): void;

		getIframe (): HTMLIFrameElement;

		destroy (): void;
	}
}
