import { isBoolean, isFile, isLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { DocumentEntity } from '../entities/document'
import { DocumentToModel } from '../../data/models/document'

type Content = UploadedFile | Media | null

export class DocumentFactory extends BaseFactory<DocumentEntity, DocumentToModel, DocumentToModel & { media: Content }> {
	readonly rules = {
		title: { required: true, rules: [isString, isLongerThanX(2)] },
		content: { required: true, rules: [isString] },
		isPrivate: { required: true, rules: [isBoolean] },
		media: { required: true, nullable: true, rules: [isFile] }
	}

	reserved = []

	constructor () {
		super({ title: '', content: '', isPrivate: true, media: null })
	}

	get title () {
		return this.values.title
	}

	set title (value: string) {
		this.set('title', value)
	}

	get content () {
		return this.values.content
	}

	set content (value: string) {
		this.set('content', value)
	}

	get isPrivate () {
		return this.values.isPrivate
	}

	set isPrivate (value: boolean) {
		this.set('isPrivate', value)
	}

	get media () {
		return this.values.media
	}

	set media (value: Content | null) {
		this.set('media', value)
	}

	loadEntity = (entity: DocumentEntity) => {
		this.title = entity.title
		this.content = entity.content
		this.isPrivate = entity.isPrivate
		this.media = entity.media
	}

	toModel = async () => {
		if (this.valid) {
			const { title, content, isPrivate, media } = this.validValues
			return { title, content, isPrivate, media: media as Media | null }
		} else {
			throw new Error('Validation errors')
		}
	}
}
