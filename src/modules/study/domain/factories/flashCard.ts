import { BaseFactory } from '@modules/core'
import { v } from 'valleyed'
import { FlashCardToModel } from '../../data/models/flashCard'
import { FlashCardEntity } from '../entities/flashCard'

export class FlashCardFactory extends BaseFactory<FlashCardEntity, FlashCardToModel, FlashCardToModel> {
	readonly rules = {
		title: v.string().min(1),
		set: v.array(v.object({
			question: v.string().min(1),
			answer: v.string().min(1)
		}), 'both question and answer must be not empty for all questions').min(1).max(128)
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

	get cards () {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const ctx = this
		return this.values.set.map((s, index) => ({
			get question () {
				return s.question
			},
			get answer () {
				return s.answer
			},
			set question (value: string) {
				ctx.questions[index].question = value
				ctx.set('set', ctx.questions)
			},
			set answer (value: string) {
				ctx.questions[index].answer = value
				ctx.set('set', ctx.questions)
			}
		}))
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
