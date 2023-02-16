import { BaseFactory } from '@modules/core'
import { v } from 'valleyed'
import { DepartmentToModel } from '../../data/models/department'
import { DepartmentEntity } from '../entities/department'

export class DepartmentFactory extends BaseFactory<DepartmentEntity, DepartmentToModel, DepartmentToModel> {
	readonly rules = {
		name: v.string().min(1),
		facultyId: v.string().min(1),
		tagId: v.string().min(1)
	}

	reserved = []

	constructor () {
		super({ name: '', facultyId: '' })
	}

	get name () {
		return this.values.name
	}

	set name (value: string) {
		this.set('name', value.toLowerCase())
	}

	get facultyId () {
		return this.values.facultyId
	}

	set facultyId (value: string) {
		this.set('facultyId', value)
	}

	loadEntity = (entity: DepartmentEntity) => {
		this.name = entity.name
		this.facultyId = entity.facultyId
	}

	toModel = async () => {
		if (this.valid) {
			const { name, facultyId } = this.validValues
			return { name, facultyId }
		} else {
			throw new Error('Validation errors')
		}
	}
}
