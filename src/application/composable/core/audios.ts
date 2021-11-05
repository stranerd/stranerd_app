import { isClient } from '@utils/environment'

export enum AudioSounds {
	CHAT = '/audios/new-chat.mp3'
}

export const useAudioPlayer = (sound: AudioSounds) => {
	let player = null as HTMLAudioElement | null
	if (isClient()) player = new Audio(sound)
	const play = async () => {
		if (!player) player = new Audio(sound)
		await player.play()
	}
	return { play }
}
