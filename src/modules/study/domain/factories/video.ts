import { isBoolean, isExtractedHTMLLongerThanX, isString, isVideo } from '@stranerd/validate'
import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { VideoEntity } from '../entities/video'
import { VideoToModel } from '../../data/models/video'
import { getVideoInfo } from 'youtube-video-exists'
import getVideoId from 'get-video-id'

type Content = UploadedFile | Media | null
type Keys = {
	title: string, description: string,
	isHosted: boolean, media: Content | null, link: string | null
}

export class VideoFactory extends BaseFactory<VideoEntity, VideoToModel, Keys> {
	readonly rules = {
		title: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		description: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		isHosted: { required: true, rules: [isBoolean] },
		link: { required: () => !this.isHosted, rules: [isString] },
		media: { required: () => this.isHosted, rules: [isVideo] }
	}

	reserved = []

	constructor () {
		super({
			title: '',
			description: '',
			isHosted: false,
			media: null,
			link: null
		})
	}

	get title () {
		return this.values.title
	}

	set title (value: string) {
		this.set('title', value)
	}

	get description () {
		return this.values.description
	}

	set description (value: string) {
		this.set('description', value)
	}

	get isHosted () {
		return this.values.isHosted
	}

	set isHosted (value: boolean) {
		this.set('isHosted', value)
		if (value) this.link = null
		else this.media = null
	}

	get link () {
		return this.values.link
	}

	set link (value: string | null) {
		this.set('link', value)
		if (value) this.isHosted = false
	}

	get media () {
		return this.values.media
	}

	set media (value: Content | null) {
		this.set('media', value)
		if (value) this.isHosted = true
	}

	loadEntity = (entity: VideoEntity) => {
		this.title = entity.title
		this.description = entity.description
		this.isHosted = entity.isHosted
		this.link = entity.link
		this.media = entity.media
	}

	toModel = async () => {
		if (this.valid) {
			if (!this.isHosted && this.link) {
				const { service, id } = getVideoId(this.link)
				if (service === 'youtube') {
					const info = await getVideoInfo(id!).catch(() => {
						throw new Error('unable to fetch video details')
					})
					if (!info.existing) throw new Error('no video with the provided id was found')
					if (info.private) throw new Error('the provided video is private')
				}
			}
			if (this.isHosted) this.link = null
			else this.media = null
			const { title, description, isHosted, link, media } = this.validValues
			return {
				title,
				description,
				isHosted,
				link,
				media: media as Media | null
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
