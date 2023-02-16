import { BaseFactory } from '@modules/core'
import { v } from 'valleyed'
import { SetToModel } from '../../data/models/set'
import { SetEntity } from '../entities/set'

export class SetFactory extends BaseFactory<SetEntity, SetToModel, SetToModel> {
	readonly rules = {
		name: v.string().min(3)
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
