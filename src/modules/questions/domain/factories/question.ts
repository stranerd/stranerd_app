import {
	hasLessThanX,
	isArrayOfX,
	isExtractedHTMLLongerThanX,
	isImage,
	isLongerThanX,
	isString
} from '@stranerd/validate'
import { BaseFactory, Media } from '@modules/core'
import { QuestionEntity } from '../entities/question'
import { QuestionToModel } from '../../data/models/question'

type Content = File | Media
type Keys = {
	body: string, subjectId: string, tags: string[], attachments: Content[]
}

export class QuestionFactory extends BaseFactory<QuestionEntity, QuestionToModel, Keys> {
	readonly rules = {
		body: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		attachments: { required: true, rules: [isArrayOfX((com) => isImage(com).valid, 'images'), hasLessThanX(6)] },
		subjectId: { required: true, rules: [isString, isLongerThanX(0)] },
		tags: {
			required: true,
			rules: [isArrayOfX((cur) => isString(cur).valid, 'strings')]
		}
	}

	reserved = []

	constructor () {
		super({ body: '', subjectId: '', tags: [], attachments: [] })
	}

	get body () {
		return this.values.body
	}

	set body (value: string) {
		this.set('body', value)
	}

	get subjectId () {
		return this.values.subjectId
	}

	set subjectId (value: string) {
		this.set('subjectId', value)
	}

	get tags () {
		return this.values.tags
	}

	get attachments () {
		return this.values.attachments
	}

	addAttachment = (value: Content) => this.set('attachments', [...this.values.attachments, value])
	removeAttachment = (value: Content) => this.set('attachments', this.values.attachments.filter((doc) => doc.name !== value.name))

	addTag = (value: string) => {
		if (this.tags.find((t) => t === value.toLowerCase())) return
		this.set('tags', [...this.tags, value.toLowerCase()])
	}

	removeTag = (value: string) => this.set('tags', this.tags.filter((tag) => tag !== value))

	loadEntity = (entity: QuestionEntity) => {
		this.body = entity.body
		this.subjectId = entity.subjectId
		this.set('tags', entity.tags)
		this.set('attachments', entity.attachments)
	}

	toModel = async () => {
		if (this.valid) {
			const docs = await Promise.all(this.attachments.map(async (doc) => {
				if (doc instanceof File) return await this.uploadFile('questions', doc)
				return doc
			}))
			this.set('attachments', docs)

			const { attachments, body, tags, subjectId } = this.validValues
			return { attachments: attachments as Media[], body, tags, subjectId }
		} else {
			throw new Error('Validation errors')
		}
	}
}
