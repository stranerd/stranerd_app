import { BaseFactory } from '@modules/core'
import { v } from 'valleyed'
import { InstitutionToModel } from '../../data/models/institution'
import { InstitutionEntity } from '../entities/institution'

export class InstitutionFactory extends BaseFactory<InstitutionEntity, InstitutionToModel, InstitutionToModel> {
	readonly rules = {
		name: v.string().min(1),
		isGateway: v.boolean()
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
