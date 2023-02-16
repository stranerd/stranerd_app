import { BaseFactory } from '@modules/core'
import { v } from 'valleyed'
import { CourseToModel } from '../../data/models/course'
import { CourseEntity } from '../entities/course'

export class CourseFactory extends BaseFactory<CourseEntity, CourseToModel, CourseToModel> {
	readonly rules = {
		name: v.string().min(1),
		institutionId: v.string().min(1),
		departmentId: v.string().min(1).nullable()
	}

	reserved = []

	constructor () {
		super({ name: '', institutionId: '', departmentId: null })
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

	get departmentId () {
		return this.values.departmentId
	}

	set departmentId (value: string | null) {
		this.set('departmentId', value)
	}

	loadEntity = (entity: CourseEntity) => {
		this.name = entity.name
		this.institutionId = entity.institutionId
		this.departmentId = entity.departmentId
	}

	toModel = async () => {
		if (this.valid) {
			const { name, institutionId, departmentId } = this.validValues
			return { name, institutionId, departmentId }
		} else {
			throw new Error('Validation errors')
		}
	}
}
