import {
	hasLessThanX,
	hasMoreThanX,
	isArrayOfX,
	isExtractedHTMLLongerThanX,
	isLessThanX,
	isMoreThanX,
	isNumber,
	isString
} from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { MAXIMUM_COINS, MINIMUM_COINS } from '@utils/constants'
import { QuestionEntity } from '../entities/question'
import { QuestionToModel } from '../../data/models/question'

type Keys = {
	body: string, coins: number, subjectId: string, tags: string[]
}

export class QuestionFactory extends BaseFactory<QuestionEntity, QuestionToModel, Keys> {
	readonly rules = {
		body: { required: true, rules: [isString, isExtractedHTMLLongerThanX(2)] },
		coins: { required: true, rules: [isNumber, isMoreThanX(MINIMUM_COINS - 1), isLessThanX(MAXIMUM_COINS + 1)] },
		subjectId: { required: true, rules: [isString] },
		tags: {
			required: true,
			rules: [isArrayOfX((com) => isString(com).valid, 'string'), hasMoreThanX(0), hasLessThanX(4)]
		}
	}

	reserved = []

	constructor () {
		super({ body: '', coins: 0, subjectId: '', tags: [] })
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
	}

	toModel = async () => {
		if (this.valid) {
			const { body, coins, tags, subjectId } = this.validValues
			return { body, coins, tags, subjectId }
		} else {
			throw new Error('Validation errors')
		}
	}
}
