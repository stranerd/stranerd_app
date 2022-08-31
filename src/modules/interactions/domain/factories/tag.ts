import { arrayContainsX, isLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory } from '@modules/core'
import { TagEntity } from '../entities/tag'
import { TagToModel } from '../../data/models/tag'
import { TagTypes } from '@modules/interactions/domain/types'

export class TagFactory extends BaseFactory<TagEntity, TagToModel, TagToModel> {
	readonly rules = {
		title: { required: true, rules: [isString, isLongerThanX(0)] },
		type: { required: true, rules: [isString, arrayContainsX(Object.keys(TagTypes), (cur, val) => cur === val)] },
		parent: { required: true, nullable: true, rules: [isString] }
	}

	reserved = []

	constructor () {
		super({ title: '', type: TagTypes.questions, parent: null })
	}

	get title () {
		return this.values.title
	}

	set title (value: string) {
		this.set('title', value)
	}

	get type () {
		return this.values.type
	}

	set type (value: string) {
		this.set('type', value)
	}

	get parent () {
		return this.values.parent
	}

	set parent (value: string | null) {
		this.set('parent', value)
	}

	loadEntity = (entity: TagEntity) => {
		this.title = entity.title
		this.type = entity.type
		this.parent = entity.parent
	}

	toModel = async () => {
		if (this.valid) {
			const { title, type, parent } = this.validValues
			return { title, type, parent }
		} else {
			throw new Error('Validation errors')
		}
	}
}
