import { hasLessThanX, hasMoreThanX, isArrayOfX, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { FlashCardEntity } from '../entities/flashCard'
import { FlashCardToModel } from '../../data/models/flashCard'

export class FlashCardFactory extends BaseFactory<FlashCardEntity, FlashCardToModel, FlashCardToModel> {
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
		super({ set: [], tags: [] })
	}

	get tags () {
		return this.values.tags
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
