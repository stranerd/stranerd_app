import { isLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { TagEntity } from '../entities/tag'
import { TagToModel } from '../../data/models/tag'

export class TagFactory extends BaseFactory<TagEntity, TagToModel, TagToModel> {
	readonly rules = {
		title: { required: true, rules: [isString, isLongerThanX(0)] },
		parent: { required: true, nullable: true, rules: [isString] }
	}

	reserved = []

	constructor () {
		super({ title: '', parent: null })
	}

	get title () {
		return this.values.title
	}

	set title (value: string) {
		this.set('title', value)
	}

	get parent () {
		return this.values.parent
	}

	set parent (value: string | null) {
		this.set('parent', value)
	}

	loadEntity = (entity: TagEntity) => {
		this.title = entity.title
		this.parent = entity.parent
	}

	toModel = async () => {
		if (this.valid) {
			const { title, parent } = this.validValues
			return { title, parent }
		} else {
			throw new Error('Validation errors')
		}
	}
}
