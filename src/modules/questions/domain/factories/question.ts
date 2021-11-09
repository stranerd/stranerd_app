import {
	hasLessThanX,
	hasMoreThanX,
	isArrayOfX,
	isExtractedHTMLLongerThanX,
	isImage,
	isLessThanX,
	isLongerThanX,
	isMoreThanX,
	isNumber,
	isString
} from '@stranerd/validate'
import { BaseFactory, Media } from '@modules/core'
import { MAXIMUM_COINS, MINIMUM_COINS } from '@utils/constants'
import { QuestionEntity } from '../entities/question'
import { QuestionToModel } from '../../data/models/question'

type Content = File | Media
type Keys = {
	body: string, coins: number, subjectId: string, tags: string[], attachments: Content[]
}

export class QuestionFactory extends BaseFactory<QuestionEntity, QuestionToModel, Keys> {
	readonly rules = {
		body: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		attachments: { required: true, rules: [isArrayOfX((com) => isImage(com).valid, 'images'), hasLessThanX(6)] },
		coins: { required: true, rules: [isNumber, isMoreThanX(MINIMUM_COINS - 1), isLessThanX(MAXIMUM_COINS + 1)] },
		subjectId: { required: true, rules: [isString, isLongerThanX(0)] },
		tags: {
			required: true,
			rules: [isArrayOfX((com) => isString(com).valid, 'string'), hasMoreThanX(0), hasLessThanX(4)]
		}
	}

	reserved = []

	constructor () {
		super({ body: '', coins: 0, subjectId: '', tags: [], attachments: [] })
	}

	get body () {
		return this.values.body
	}

	set body (value: string) {
		this.set('body', value)
	}

	get coins () {
		return this.values.coins
	}

	set coins (value: number) {
		this.set('coins', value)
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
		this.coins = entity.coins
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

			const { attachments, body, coins, tags, subjectId } = this.validValues
			return { attachments: attachments as Media[], body, coins, tags, subjectId }
		} else {
			throw new Error('Validation errors')
		}
	}
}
