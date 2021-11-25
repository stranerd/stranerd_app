import { BaseFactory } from '@modules/core'
import { isBoolean, isLongerThanX, isString } from '@stranerd/validate'
import { SetEntity } from '../entities/set'
import { SetToModel } from '../../data/models/set'

export class SetFactory extends BaseFactory<SetEntity, SetToModel, SetToModel> {
	readonly rules = {
		name: { required: true, rules: [isString, isLongerThanX(0)] },
		isPublic: { required: true, rules: [isBoolean] }
	}

	reserved = []

	constructor () {
		super({ name: '', isPublic: false })
	}

	get name () {
		return this.values.name
	}

	set name (value: string) {
		this.set('name', value)
	}

	get isPublic () {
		return this.values.isPublic
	}

	set isPublic (value: boolean) {
		this.set('isPublic', value)
	}

	loadEntity = (entity: SetEntity) => {
		this.name = entity.name
		this.isPublic = entity.isPublic
	}

	toModel = async () => {
		if (this.valid) {
			const { name, isPublic } = this.validValues
			return { name, isPublic }
		} else {
			throw new Error('Validation errors')
		}
	}
}
