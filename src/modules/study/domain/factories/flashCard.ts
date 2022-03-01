import { hasMoreThanX, isArrayOfX, isBoolean, isLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { FlashCardEntity } from '../entities/flashCard'
import { FlashCardToModel } from '../../data/models/flashCard'

export class FlashCardFactory extends BaseFactory<FlashCardEntity, FlashCardToModel, FlashCardToModel> {
	readonly rules = {
		title: { required: true, rules: [isString, isLongerThanX(0)] },
		isPublic: { required: true, rules: [isBoolean] },
		set: {
			required: true,
			rules: [
				isArrayOfX((cur: any) => isString(cur?.question).valid && isString(cur?.answer).valid, 'questions'),
				hasMoreThanX(0)
			]
		}
	}

	reserved = []

	constructor () {
		super({ title: '', isPublic: true, set: [{ question: '', answer: '' }] })
	}

	get title () {
		return this.values.title
	}

	set title (value: string) {
		this.set('title', value)
	}

	get isPublic () {
		return this.values.isPublic
	}

	set isPublic (value: boolean) {
		this.set('isPublic', value)
	}

	get questions () {
		return this.values.set
	}

	addQuestion () {
		this.set('set', [...this.questions, { question: '', answer: '' }])
	}

	removeQuestion (index: number) {
		if (this.questions.length === 1) return
		this.questions.splice(index, 1)
	}

	loadEntity = (entity: FlashCardEntity) => {
		this.set('title', entity.title)
		this.set('isPublic', entity.isPublic)
		this.set('set', entity.set)
	}

	toModel = async () => {
		if (this.valid) {
			const { title, isPublic, set } = this.validValues
			return { title, isPublic, set }
		} else {
			throw new Error('Validation errors')
		}
	}
}
