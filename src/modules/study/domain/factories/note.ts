import {
	hasLessThanX,
	hasMoreThanX,
	isArrayOfX,
	isBoolean,
	isExtractedHTMLLongerThanX,
	isFile,
	isRequiredIfX,
	isString
} from '@stranerd/validate'
import { BaseFactory, Media } from '@modules/core'
import { NoteEntity } from '../entities/note'
import { NoteToModel } from '../../data/models/note'

type Content = File | Media
type Keys = {
	title: string, description: string, tags: string[], isHosted: boolean, media: Content | null, link: string | null
}

export class NoteFactory extends BaseFactory<NoteEntity, NoteToModel, Keys> {
	readonly rules = {
		title: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		description: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		tags: {
			required: true,
			rules: [isArrayOfX((cur) => isString(cur).valid, 'strings'), hasMoreThanX(0), hasLessThanX(4)]
		},
		isHosted: { required: false, rules: [isBoolean] },
		link: { required: false, rules: [isRequiredIfX(!this.isHosted), isString] },
		media: { required: false, rules: [isRequiredIfX(this.isHosted), isFile] }
	}

	reserved = []

	constructor () {
		super({ title: '', description: '', isHosted: true, tags: [], media: null, link: null })
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

	addTag = (value: string) => {
		if (this.tags.find((t) => t === value.toLowerCase())) return
		this.set('tags', [...this.tags, value.toLowerCase()])
	}

	removeTag = (value: string) => this.set('tags', this.tags.filter((tag) => tag !== value))

	loadEntity = (entity: NoteEntity) => {
		this.title = entity.title
		this.description = entity.description
		this.isHosted = entity.isHosted
		this.link = entity.link
		this.media = entity.media
		this.set('tags', entity.tags)
	}

	toModel = async () => {
		if (this.valid) {
			if (this.media instanceof File) this.media = await this.uploadFile('notes', this.media)
			const { title, description, isHosted, link, media, tags } = this.validValues
			return { title, description, isHosted, link, media: media as Media | null, tags }
		} else {
			throw new Error('Validation errors')
		}
	}
}
