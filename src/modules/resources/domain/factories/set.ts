import { BaseFactory } from '@modules/core'
import { isLongerThanX, isString } from '@stranerd/validate'
import { SetEntity } from '../entities/set'
import { SetToModel } from '../../data/models/set'

export class SetFactory extends BaseFactory<SetEntity, SetToModel, SetToModel> {
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

	loadEntity = (entity: SetEntity) => {
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
