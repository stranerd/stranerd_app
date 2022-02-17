import {
	isArrayOfX,
	isBoolean,
	isExtractedHTMLLongerThanX,
	isFile,
	isImage,
	isInvalid,
	isString,
	isValid
} from '@stranerd/validate'
import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { NoteEntity } from '@modules/study'
import { NoteToModel } from '../../data/models/note'

type Content = UploadedFile | Media | null
type Keys = {
	title: string, description: string, tags: string[], isPublic: boolean,
	isHosted: boolean, media: Content | null, link: string | null, preview: Content | null
}

const docFormats = ['application/pdf']

export class NoteFactory extends BaseFactory<NoteEntity, NoteToModel, Keys> {
	readonly rules = {
		title: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		description: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		tags: {
			required: true,
			rules: [isArrayOfX((cur) => isString(cur).valid, 'strings')]
		},
		isPublic: { required: true, rules: [isBoolean] },
		isHosted: { required: true, rules: [isBoolean] },
		link: { required: () => !this.isHosted, rules: [isString] },
		preview: { required: false, rules: [isImage] },
		media: {
			required: () => this.isHosted, rules: [isFile,
				(val: any) => docFormats.includes(val?.type) ? isValid() : isInvalid('only pdf files are allowed')
			]
		}
	}

	reserved = []

	constructor () {
		super({
			title: '',
			description: '',
			isPublic: true,
			isHosted: true,
			tags: [],
			media: null,
			link: null,
			preview: null
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

	get isPublic () {
		return this.values.isPublic
	}

	set isPublic (value: boolean) {
		this.set('isPublic', value)
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

	loadEntity = (entity: NoteEntity) => {
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
			if (this.media instanceof UploadedFile) this.media = await this.uploadFile('notes', this.media)
			if (this.preview instanceof UploadedFile) this.preview = await this.uploadFile('note-previews', this.preview)
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
