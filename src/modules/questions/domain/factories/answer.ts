import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { v } from 'valleyed'
import { AnswerToModel } from '../../data/models/answer'
import { AnswerEntity } from '../entities/answer'

type Content = UploadedFile | Media

export class AnswerFactory extends BaseFactory<AnswerEntity, AnswerToModel, AnswerToModel & { attachments: Content[] }> {
	readonly rules = {
		attachments: v.array(v.file().image()).max(5),
		body: v.string().min(3, true),
		questionId: v.string().min(1)
	}

	reserved = ['questionId']

	constructor () {
		super({ body: '', questionId: '', attachments: [] })
	}

	get body () {
		return this.values.body
	}

	set body (value: string) {
		this.set('body', value)
	}

	get questionId () {
		return this.values.questionId
	}

	set questionId (value: string) {
		this.set('questionId', value)
	}

	get attachments () {
		return this.values.attachments
	}

	addAttachment = (value: Content) => this.set('attachments', [...this.values.attachments, value])
	removeAttachment = (value: Content) => this.set('attachments', this.values.attachments.filter((doc) => doc.name !== value.name))

	loadEntity = (entity: AnswerEntity) => {
		this.body = entity.body
		this.questionId = entity.questionId
		this.set('attachments', entity.attachments)
	}

	toModel = async () => {
		if (this.valid) {
			const docs = await Promise.all(this.attachments.map(async (doc) => {
				if (doc instanceof UploadedFile) return await this.uploadFile('questions/answers', doc)
				return doc
			}))
			this.set('attachments', docs)
			const { attachments, body, questionId } = this.validValues
			return { attachments: attachments as Media[], body, questionId }
		} else {
			throw new Error('Validation errors')
		}
	}
}
