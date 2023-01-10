import { hasLessThanOrEqualToX, hasMoreThanX, isArrayOfX, isLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { FlashCardEntity } from '../entities/flashCard'
import { FlashCardToModel } from '../../data/models/flashCard'

export class FlashCardFactory extends BaseFactory<FlashCardEntity, FlashCardToModel, FlashCardToModel> {
	readonly rules = {
		title: { required: true, rules: [isString, isLongerThanX(0)] },
		set: {
			required: true,
			rules: [
				isArrayOfX((cur: any) => isString(cur?.question).valid && isString(cur?.answer).valid, 'questions'),
				hasMoreThanX(0), hasLessThanOrEqualToX(128)
			]
		}
	}

	reserved = []

	constructor () {
		super({ title: '', set: [{ question: '', answer: '' }] })
	}

	get title () {
		return this.values.title
	}

	set title (value: string) {
		this.set('title', value)
	}

	get questions () {
		return this.values.set
	}

	addQuestion () {
		if (this.questions.length === 128) this.errors.set = 'cannot add more than 128 cards'
		else this.set('set', [...this.questions, { question: '', answer: '' }])
	}

	removeQuestion (index: number) {
		if (this.questions.length === 1) return
		this.questions.splice(index, 1)
		this.set('set', this.questions)
	}

	loadEntity = (entity: FlashCardEntity) => {
		this.set('title', entity.title)
		this.set('set', entity.set)
	}

	toModel = async () => {
		if (this.valid) {
			const { title, set } = this.validValues
			return { title, set: set.filter((s) => s.question && s.answer) }
		} else {
			throw new Error('Validation errors')
		}
	}
}
