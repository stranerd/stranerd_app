import { BaseFactory } from '@modules/core'
import { isBoolean, isLongerThanX, isString } from '@stranerd/validate'
import { InstitutionEntity } from '../entities/institution'
import { InstitutionToModel } from '../../data/models/institution'

export class InstitutionFactory extends BaseFactory<InstitutionEntity, InstitutionToModel, InstitutionToModel> {
	readonly rules = {
		name: { required: true, rules: [isString, isLongerThanX(0)] },
		isSchool: { required: true, rules: [isBoolean] },
		isGateway: { required: true, rules: [isBoolean] }
	}

	reserved = []

	constructor () {
		super({ name: '', isSchool: false, isGateway: false })
	}

	get name () {
		return this.values.name
	}

	set name (value: string) {
		this.set('name', value)
	}

	get isSchool () {
		return this.values.isSchool
	}

	set isSchool (value: boolean) {
		this.set('isSchool', value)
	}

	get isGateway () {
		return this.values.isGateway
	}

	set isGateway (value: boolean) {
		this.set('isGateway', value)
	}

	loadEntity = (entity: InstitutionEntity) => {
		this.name = entity.name
		this.isSchool = entity.isSchool
		this.isGateway = entity.isGateway
	}

	toModel = async () => {
		if (this.valid) {
			const { name, isSchool, isGateway } = this.validValues
			return { name, isSchool, isGateway }
		} else {
			throw new Error('Validation errors')
		}
	}
}
