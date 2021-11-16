import { BaseFactory } from '@modules/core'
import { isLongerThanX, isString } from '@stranerd/validate'
import { InstitutionEntity } from '../entities/institution'
import { InstitutionToModel } from '../../data/models/institution'

interface Keys {
	name: string
}

export class InstitutionFactory extends BaseFactory<InstitutionEntity, InstitutionToModel, Keys> {
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
		this.set('name', value)
	}

	loadEntity = (entity: InstitutionEntity) => {
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
