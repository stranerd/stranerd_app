import { BaseFactory } from '@modules/core'
import { isLongerThanX, isString } from '@stranerd/validate'
import { CourseEntity } from '../entities/course'
import { CourseToModel } from '../../data/models/course'

export class CourseFactory extends BaseFactory<CourseEntity, CourseToModel, CourseToModel> {
	readonly rules = {
		name: { required: true, rules: [isString, isLongerThanX(0)] },
		institutionId: { required: true, rules: [isString, isLongerThanX(0)] },
		departmentId: { required: true, nullable: true, rules: [isString, isLongerThanX(0)] }
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
