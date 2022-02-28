import { BaseFactory } from '@modules/core'
import { arrayContainsX, isArrayOfX, isBoolean, isLongerThanX, isString } from '@stranerd/validate'
import { SetEntity, SetType } from '../entities/set'
import { SetToModel } from '../../data/models/set'
import { getQuerySetId } from '@utils/query'

type Keys = {
	name: string, parent: string, tags: string[], isPublic: boolean, type: SetType, classId: string | null
}

export class SetFactory extends BaseFactory<SetEntity, SetToModel, Keys> {
	readonly rules = {
		name: { required: true, rules: [isString, isLongerThanX(0)] },
		parent: { required: false, rules: [isString] },
		isPublic: { required: true, rules: [isBoolean] },
		tags: {
			required: true,
			rules: [isArrayOfX((cur) => isString(cur).valid, 'strings')]
		},
		type: {
			required: true,
			rules: [arrayContainsX(Object.keys(SetType), (cur, val) => cur === val)]
		},
		classId: {
			required: () => this.isClassType,
			rules: [isString]
		}
	}

	reserved = []

	constructor () {
		super({ name: '', parent: getQuerySetId(), isPublic: true, tags: [], type: SetType.users, classId: null })
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

	set parent (value: string) {
		this.set('parent', value)
	}

	get isPublic () {
		return this.values.isPublic
	}

	set isPublic (value: boolean) {
		this.set('isPublic', value)
	}

	get type () {
		return this.values.type
	}

	set type (value: SetType) {
		this.set('type', value)
	}

	get classId () {
		return this.values.classId
	}

	set classId (value: string | null) {
		this.set('classId', value)
	}

	get tags () {
		return this.values.tags
	}

	get isClassType () {
		return this.type === SetType.classes
	}

	get isUsersType () {
		return this.type === SetType.users
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
		this.type = entity.data.type
		if (entity.data.type === SetType.classes) {
			this.classId = entity.data.classId
		}
	}

	toModel = async () => {
		if (this.valid) {
			const { name, parent, isPublic, tags, type, classId } = this.validValues
			return {
				name, parent, isPublic, tags,
				data: this.isClassType ? {
					type: type as any, classId
				} : { type: type as any }
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
