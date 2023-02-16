import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { v } from 'valleyed'
import { QuestionToModel } from '../../data/models/question'
import { QuestionEntity } from '../entities/question'

type Content = UploadedFile | Media

export class QuestionFactory extends BaseFactory<QuestionEntity, QuestionToModel, QuestionToModel & { attachments: Content[] }> {
	readonly rules = {
		body: v.string().min(3, true),
		isPrivate: v.boolean(),
		attachments: v.array(v.file().image()).max(5),
		tagId: v.string().min(1)
	}

	reserved = []

	constructor () {
		super({ body: '', tagId: '', attachments: [], isPrivate: false })
	}

	get body () {
		return this.values.body
	}

	set body (value: string) {
		this.set('body', value)
	}

	get tagId () {
		return this.values.tagId
	}

	set tagId (value: string) {
		this.set('tagId', value)
	}

	get isPrivate () {
		return this.values.isPrivate
	}

	set isPrivate (value: boolean) {
		this.set('isPrivate', value)
	}

	get attachments () {
		return this.values.attachments
	}

	addAttachment = (value: Content) => this.set('attachments', [...this.values.attachments, value])

	removeAttachment = (value: Content) => this.set('attachments', this.values.attachments.filter((doc) => doc.name !== value.name))

	loadEntity = (entity: QuestionEntity) => {
		this.body = entity.body
		this.tagId = entity.tagId
		this.isPrivate = entity.isPrivate
		this.set('attachments', entity.attachments)
	}

	toModel = async () => {
		if (this.valid) {
			const docs = await Promise.all(this.attachments.map(async (doc) => {
				if (doc instanceof UploadedFile) return await this.uploadFile('questions/questions', doc)
				return doc
			}))
			this.set('attachments', docs)

			const { attachments, body, tagId, isPrivate } = this.validValues
			return { attachments: attachments as Media[], body, tagId, isPrivate }
		} else {
			throw new Error('Validation errors')
		}
	}
}
