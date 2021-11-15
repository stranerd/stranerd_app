import { BaseFactory } from '@modules/core'
import { isLongerThanX, isString } from '@stranerd/validate'
import { SubjectEntity } from '../entities/subject'
import { SubjectToModel } from '../../data/models/subject'

interface Keys {
	name: string
}

export class SubjectFactory extends BaseFactory<SubjectEntity, SubjectToModel, Keys> {
	readonly rules = {
		name: { required: true, rules: [isString, isLongerThanX(0)] }
	}

	reserved = []

	constructor () {
		super({ name: '' })
	}

	get name () {
		return this.values.name
	}

	set name (value: string) {
		this.set('name', value.toLowerCase())
	}

	loadEntity = (entity: SubjectEntity) => {
		this.name = entity.name
	}

	toModel = async () => {
		if (this.valid) {
			const { name } = this.validValues
			return { name }
		} else {
			throw new Error('Validation errors')
		}
	}
}
