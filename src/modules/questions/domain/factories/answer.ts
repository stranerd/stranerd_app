import {
	hasLessThanX,
	isArrayOfX,
	isExtractedHTMLLongerThanX,
	isImage,
	isLongerThanX,
	isString
} from '@stranerd/validate'
import { BaseFactory, Media } from '@modules/core'
import { AnswerEntity } from '../entities/answer'
import { AnswerToModel } from '../../data/models/answer'

type Content = File | Media
type Keys = {
	title: string, body: string, questionId: string, attachments: Content[]
}

export class AnswerFactory extends BaseFactory<AnswerEntity, AnswerToModel, Keys> {
	readonly rules = {
		title: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		attachments: { required: true, rules: [isArrayOfX((com) => isImage(com).valid, 'images'), hasLessThanX(6)] },
		body: { required: true, rules: [isString] },
		questionId: { required: true, rules: [isString, isLongerThanX(0)] }
	}

	reserved = ['questionId']

	constructor () {
		super({ title: '', body: '', questionId: '', attachments: [] })
	}

	get title () {
		return this.values.title
	}

	set title (value: string) {
		this.set('title', value)
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
		this.title = entity.title
		this.body = entity.body
		this.questionId = entity.questionId
		this.set('attachments', entity.attachments)
	}

	toModel = async () => {
		if (this.valid) {
			const docs = await Promise.all(this.attachments.map(async (doc) => {
				if (doc instanceof File) return await this.uploadFile('answers', doc)
				return doc
			}))
			this.set('attachments', docs)
			const { attachments, title, body, questionId } = this.validValues
			return { attachments: attachments as Media[], title, body, questionId }
		} else {
			throw new Error('Validation errors')
		}
	}
}
