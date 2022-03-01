import { isBoolean, isExtractedHTMLLongerThanX, isFile, isInvalid, isString, isValid } from '@stranerd/validate'
import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { NoteEntity } from '@modules/study'
import { NoteToModel } from '../../data/models/note'

type Content = UploadedFile | Media | null
type Keys = {
	title: string, description: string, isPublic: boolean,
	isHosted: boolean, media: Content | null, link: string | null
}

const docFormats = ['application/pdf']

export class NoteFactory extends BaseFactory<NoteEntity, NoteToModel, Keys> {
	readonly rules = {
		title: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		description: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		isPublic: { required: true, rules: [isBoolean] },
		isHosted: { required: true, rules: [isBoolean] },
		link: { required: () => !this.isHosted, rules: [isString] },
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

	get isPublic () {
		return this.values.isPublic
	}

	set isPublic (value: boolean) {
		this.set('isPublic', value)
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

	loadEntity = (entity: NoteEntity) => {
		this.title = entity.title
		this.description = entity.description
		this.isPublic = entity.isPublic
		this.isHosted = entity.isHosted
		this.link = entity.link
		this.media = entity.media
	}

	toModel = async () => {
		if (this.valid) {
			if (this.media instanceof UploadedFile) this.media = await this.uploadFile('study/notes', this.media)
			if (this.isHosted) this.link = null
			else this.media = null
			const { title, description, isHosted, link, media, isPublic } = this.validValues
			return {
				title,
				description,
				isHosted,
				link,
				media: media as Media | null,
				isPublic
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
