import {
	hasLessThanX,
	isArrayOfX,
	isExtractedHTMLLongerThanX,
	isImage,
	isLongerThanX,
	isString
} from '@stranerd/validate'
import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { QuestionEntity } from '../entities/question'
import { QuestionToModel } from '../../data/models/question'

type Content = UploadedFile | Media

export class QuestionFactory extends BaseFactory<QuestionEntity, QuestionToModel, QuestionToModel & { attachments: Content[] }> {
	readonly rules = {
		body: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		attachments: { required: true, rules: [isArrayOfX((com) => isImage(com).valid, 'images'), hasLessThanX(6)] },
		tagId: { required: true, rules: [isString, isLongerThanX(0)] }
	}

	reserved = []

	constructor () {
		super({ body: '', tagId: '', attachments: [] })
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

	get attachments () {
		return this.values.attachments
	}

	addAttachment = (value: Content) => this.set('attachments', [...this.values.attachments, value])

	removeAttachment = (value: Content) => this.set('attachments', this.values.attachments.filter((doc) => doc.name !== value.name))

	loadEntity = (entity: QuestionEntity) => {
		this.body = entity.body
		this.tagId = entity.tagId
		this.set('attachments', entity.attachments)
	}

	toModel = async () => {
		if (this.valid) {
			const docs = await Promise.all(this.attachments.map(async (doc) => {
				if (doc instanceof UploadedFile) return await this.uploadFile('questions/questions', doc)
				return doc
			}))
			this.set('attachments', docs)

			const { attachments, body, tagId } = this.validValues
			return { attachments: attachments as Media[], body, tagId }
		} else {
			throw new Error('Validation errors')
		}
	}
}
