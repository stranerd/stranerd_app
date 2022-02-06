import { BaseFactory } from '@modules/core'
import { isArrayOfX, isBoolean, isLongerThanX, isString } from '@stranerd/validate'
import { SetEntity } from '../entities/set'
import { SetToModel } from '../../data/models/set'
import { getQuerySetId } from '@utils/query'

export class SetFactory extends BaseFactory<SetEntity, SetToModel, SetToModel> {
	readonly rules = {
		name: { required: true, rules: [isString, isLongerThanX(0)] },
		parent: { required: false, rules: [isString] },
		isPublic: { required: true, rules: [isBoolean] },
		tags: {
			required: true,
			rules: [isArrayOfX((cur) => isString(cur).valid, 'strings')]
		}
	}

	reserved = []

	constructor () {
		super({ name: '', parent: getQuerySetId(), isPublic: true, tags: [] })
	}

	get name () {
		return this.values.name
	}

	set name (value: string) {
		this.set('name', value)
	}

	get parent () {
		return this.values.parent
	}

	set parent (value: string | null) {
		this.set('parent', value)
	}

	get isPublic () {
		return this.values.isPublic
	}

	set isPublic (value: boolean) {
		this.set('isPublic', value)
	}

	get tags () {
		return this.values.tags
	}

	addTag = (value: string) => {
		if (this.tags.find((t) => t === value.toLowerCase())) return
		this.set('tags', [...this.tags, value.toLowerCase()])
	}

	removeTag = (value: string) => this.set('tags', this.tags.filter((tag) => tag !== value))

	loadEntity = (entity: SetEntity) => {
		this.name = entity.name
		this.isPublic = entity.isPublic
		this.parent = entity.parent
		this.set('tags', entity.tags)
	}

	toModel = async () => {
		if (this.valid) {
			const { name, parent, isPublic, tags } = this.validValues
			return { name, parent, isPublic, tags }
		} else {
			throw new Error('Validation errors')
		}
	}
}
