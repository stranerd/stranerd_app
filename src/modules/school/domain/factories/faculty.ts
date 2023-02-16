import { BaseFactory } from '@modules/core'
import { v } from 'valleyed'
import { FacultyToModel } from '../../data/models/faculty'
import { FacultyEntity } from '../entities/faculty'

export class FacultyFactory extends BaseFactory<FacultyEntity, FacultyToModel, FacultyToModel> {
	readonly rules = {
		name: v.string().min(1),
		institutionId: v.string().min(1)
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
