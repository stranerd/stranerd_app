import {
	hasLessThanX,
	hasMoreThanX,
	isArrayOfX,
	isBoolean,
	isExtractedHTMLLongerThanX,
	isImage,
	isRequiredIfX,
	isString,
	isVideo
} from '@stranerd/validate'
import { BaseFactory, Media } from '@modules/core'
import { VideoEntity } from '../entities/video'
import { VideoToModel } from '../../data/models/video'

type Content = File | Media
type Keys = {
	title: string, description: string, tags: string[], isPublic: boolean,
	isHosted: boolean, media: Content | null, link: string | null, preview: Content | null
}

export class VideoFactory extends BaseFactory<VideoEntity, VideoToModel, Keys> {
	readonly rules = {
		title: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		description: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		tags: {
			required: true,
			rules: [isArrayOfX((cur) => isString(cur).valid, 'strings'), hasMoreThanX(0), hasLessThanX(4)]
		},
		isPublic: { required: false, rules: [isBoolean] },
		isHosted: { required: false, rules: [isBoolean] },
		link: { required: false, rules: [isRequiredIfX(!this.isHosted), isString] },
		preview: { required: false, rules: [isImage] },
		media: { required: false, rules: [isRequiredIfX(this.isHosted), isVideo] }
	}

	youTubeUrl = 'https://youtube.com/watch?v='
	id = ''

	reserved = []

	constructor () {
		super({
			title: '',
			description: '',
			isHosted: false,
			tags: [],
			media: null,
			link: null,
			preview: null,
			isPublic: true
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

	get isPublic () {
		return this.values.isPublic
	}

	set isPublic (value: boolean) {
		this.set('isPublic', value)
	}

	get isHosted () {
		return this.values.isHosted
	}

	set isHosted (value: boolean) {
		this.set('isHosted', value)
		if (value) this.link = null
		else this.media = null
	}

	get tags () {
		return this.values.tags
	}

	get link () {
		return this.values.link
	}

	set link (value: string | null) {
		this.set('link', value)
		if (value) this.isHosted = false
	}

	get videoId () {
		return this.youTubeUrl + this.values.link
	}

	set videoId (value: string) {
		this.set('link', this.youTubeUrl + value)
	}

	get media () {
		return this.values.media
	}

	set media (value: Content | null) {
		this.set('media', value)
		if (value) this.isHosted = true
	}

	get preview () {
		return this.values.preview!
	}

	set preview (value: Content) {
		this.set('preview', value)
	}

	addTag = (value: string) => {
		if (this.tags.find((t) => t === value.toLowerCase())) return
		this.set('tags', [...this.tags, value.toLowerCase()])
	}

	removeTag = (value: string) => this.set('tags', this.tags.filter((tag) => tag !== value))

	loadEntity = (entity: VideoEntity) => {
		this.title = entity.title
		this.description = entity.description
		this.isPublic = entity.isPublic
		this.isHosted = entity.isHosted
		this.link = entity.link
		this.media = entity.media
		this.preview = entity.preview
		this.set('tags', entity.tags)
	}

	toModel = async () => {
		if (this.valid) {
			if (this.media instanceof File) this.media = await this.uploadFile('videos', this.media)
			if (this.preview instanceof File) this.preview = await this.uploadFile('video-previews', this.preview)
			if (this.isHosted) this.link = null
			else this.media = null
			const { title, description, isHosted, link, media, tags, preview, isPublic } = this.validValues
			return {
				title,
				description,
				isHosted,
				link,
				media: media as Media | null,
				tags,
				preview: preview as Media,
				isPublic
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
