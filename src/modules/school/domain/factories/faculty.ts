import { BaseFactory } from '@modules/core'
import { isLongerThanX, isString } from '@stranerd/validate'
import { FacultyEntity } from '../entities/faculty'
import { FacultyToModel } from '../../data/models/faculty'

export class FacultyFactory extends BaseFactory<FacultyEntity, FacultyToModel, FacultyToModel> {
	readonly rules = {
		name: { required: true, rules: [isString, isLongerThanX(0)] },
		institutionId: { required: true, rules: [isString, isLongerThanX(0)] }
	}

	reserved = []

	constructor () {
		super({ name: '', institutionId: '' })
	}

	get name () {
		return this.values.name
	}

	set name (value: string) {
		this.set('name', value.toLowerCase())
	}

	get institutionId () {
		return this.values.institutionId
	}

	set institutionId (value: string) {
		this.set('institutionId', value)
	}

	loadEntity = (entity: FacultyEntity) => {
		this.name = entity.name
		this.institutionId = entity.institutionId
	}

	toModel = async () => {
		if (this.valid) {
			const { name, institutionId } = this.validValues
			return { name, institutionId }
		} else {
			throw new Error('Validation errors')
		}
	}
}
