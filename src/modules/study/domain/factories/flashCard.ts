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
		})).min(1).max(128)
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
