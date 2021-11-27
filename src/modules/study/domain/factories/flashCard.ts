import { hasLessThanX, hasMoreThanX, isArrayOfX, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { FlashCardEntity } from '../entities/flashCard'
import { FlashCardToModel } from '../../data/models/flashCard'

export class FlashCardFactory extends BaseFactory<FlashCardEntity, FlashCardToModel, FlashCardToModel> {
	index = 0

	readonly rules = {
		set: {
			required: true,
			rules: [
				isArrayOfX((cur: any) => isString(cur?.question).valid && isString(cur?.answer).valid, 'questions'),
				hasMoreThanX(0), hasLessThanX(26)
			]
		},
		tags: {
			required: true,
			rules: [isArrayOfX((cur) => isString(cur).valid, 'strings'), hasMoreThanX(0), hasLessThanX(4)]
		}
	}

	reserved = []

	constructor () {
		super({ set: [{ question: '', answer: '' }], tags: [] })
	}

	get questions () {
		return this.values.set
	}

	get question () {
		return this.questions[this.index].question
	}

	set question (value: string) {
		this.questions[this.index].question = value
	}

	get answer () {
		return this.questions[this.index].answer
	}

	set answer (value: string) {
		this.questions[this.index].answer = value
	}

	get tags () {
		return this.values.tags
	}

	addQuestion () {
		this.set('set', [...this.questions, { question: '', answer: '' }])
		this.index = this.questions.length - 1
	}

	editQuestion (index: number) {
		this.index = index
	}

	addTag = (value: string) => {
		if (this.tags.find((t) => t === value.toLowerCase())) return
		this.set('tags', [...this.tags, value.toLowerCase()])
	}

	removeTag = (value: string) => this.set('tags', this.tags.filter((tag) => tag !== value))

	loadEntity = (entity: FlashCardEntity) => {
		this.set('tags', entity.tags)
		this.set('set', entity.set)
	}

	toModel = async () => {
		if (this.valid) {
			const { set, tags } = this.validValues
			return { set, tags }
		} else {
			throw new Error('Validation errors')
		}
	}
}
