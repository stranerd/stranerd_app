import { BaseFactory } from '@modules/core'
import { isBoolean, isLongerThanX, isString } from '@stranerd/validate'
import { InstitutionEntity } from '../entities/institution'
import { InstitutionToModel } from '../../data/models/institution'

export class InstitutionFactory extends BaseFactory<InstitutionEntity, InstitutionToModel, InstitutionToModel> {
	readonly rules = {
		name: { required: true, rules: [isString, isLongerThanX(0)] },
		isGateway: { required: true, rules: [isBoolean] }
	}

	reserved = []

	constructor () {
		super({ name: '', isGateway: false })
	}

	get name () {
		return this.values.name
	}

	set name (value: string) {
		this.set('name', value.toLowerCase())
	}

	get isGateway () {
		return this.values.isGateway
	}

	set isGateway (value: boolean) {
		this.set('isGateway', value)
	}

	loadEntity = (entity: InstitutionEntity) => {
		this.name = entity.name
		this.isGateway = entity.isGateway
	}

	toModel = async () => {
		if (this.valid) {
			const { name, isGateway } = this.validValues
			return { name, isGateway }
		} else {
			throw new Error('Validation errors')
		}
	}
}
