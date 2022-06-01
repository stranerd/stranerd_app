import {
	arrayContainsX,
	hasLessThanX,
	isArrayOfX,
	isExtractedHTMLLongerThanX,
	isImage,
	isLongerThanX,
	isString
} from '@stranerd/validate'
import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { QuestionEntity, QuestionType } from '../entities/question'
import { QuestionToModel } from '../../data/models/question'

type Content = UploadedFile | Media
type Keys = {
	body: string, subject: string, attachments: Content[], type: QuestionType, classId: string | null
}

export class QuestionFactory extends BaseFactory<QuestionEntity, QuestionToModel, Keys> {
	readonly rules = {
		body: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		attachments: { required: true, rules: [isArrayOfX((com) => isImage(com).valid, 'images'), hasLessThanX(6)] },
		subject: { required: true, rules: [isString, isLongerThanX(0)] },
		type: {
			required: true,
			rules: [arrayContainsX(Object.keys(QuestionType), (cur, val) => cur === val)]
		},
		classId: {
			required: () => this.isClassType, nullable: true,
			rules: [isString]
		}
	}

	reserved = []

	constructor () {
		super({ body: '', subject: '', attachments: [], type: QuestionType.users, classId: null })
	}

	get body () {
		return this.values.body
	}

	set body (value: string) {
		this.set('body', value)
	}

	get subject () {
		return this.values.subject
	}

	set subject (value: string) {
		this.set('subject', value)
	}

	get type () {
		return this.values.type
	}

	set type (value: QuestionType) {
		this.set('type', value)
	}

	get classId () {
		return this.values.classId
	}

	set classId (value: string | null) {
		this.set('classId', value)
	}

	get attachments () {
		return this.values.attachments
	}

	get isClassType () {
		return this.type === QuestionType.classes
	}

	get isUsersType () {
		return this.type === QuestionType.users
	}

	addAttachment = (value: Content) => this.set('attachments', [...this.values.attachments, value])

	removeAttachment = (value: Content) => this.set('attachments', this.values.attachments.filter((doc) => doc.name !== value.name))

	loadEntity = (entity: QuestionEntity) => {
		this.body = entity.body
		this.subject = entity.subject
		this.set('attachments', entity.attachments)
		this.type = entity.data.type
		if (entity.data.type === QuestionType.classes) {
			this.classId = entity.data.classId
		}
	}

	toModel = async () => {
		if (this.valid) {
			const docs = await Promise.all(this.attachments.map(async (doc) => {
				if (doc instanceof UploadedFile) return await this.uploadFile('questions/questions', doc)
				return doc
			}))
			this.set('attachments', docs)

			const { attachments, body, subject, type, classId } = this.validValues
			return {
				attachments: attachments as Media[], body, subject,
				data: this.isClassType ? {
					type: type as any, classId
				} : { type: type as any }
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
