import { isArrayOfX, isFile, isLongerThan, isLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { ClassEntity } from '../entities/class'
import { ClassToModel } from '../../data/models/class'

type Content = Media | UploadedFile | null
type Keys = {
	name: string, description: string, courses: string[], photo: Content,
	departmentId: string, facultyId: string, institutionId: string
}

export class ClassFactory extends BaseFactory<ClassEntity, ClassToModel, Keys> {
	readonly rules = {
		name: { required: true, rules: [isString, isLongerThanX(2)] },
		departmentId: { required: true, rules: [isString, isLongerThanX(0)] },
		facultyId: { required: true, rules: [isString, isLongerThanX(0)] },
		institutionId: { required: true, rules: [isString, isLongerThanX(0)] },
		description: { required: true, rules: [isString, isLongerThanX(2)] },
		courses: {
			required: true,
			rules: [isArrayOfX((cur) => isString(cur).valid && isLongerThan(cur as any, 0).valid, 'strings')]
		},
		photo: { required: true, nullable: true, rules: [isFile] }
	}

	reserved = []

	constructor () {
		super({
			name: '', description: '', courses: [], photo: null,
			departmentId: '', facultyId: '', institutionId: ''
		})
	}

	get name () {
		return this.values.name
	}

	set name (value: string) {
		this.set('name', value)
	}

	get description () {
		return this.values.description
	}

	set description (value: string) {
		this.set('description', value)
	}

	get courses () {
		return this.values.courses
	}

	set courses (value: string[]) {
		this.set('courses', value)
	}

	get photo () {
		return this.values.photo
	}

	set photo (value: Content) {
		this.set('photo', value)
	}

	get departmentId () {
		return this.values.departmentId
	}

	set departmentId (value: string) {
		this.set('departmentId', value)
	}

	get facultyId () {
		return this.values.facultyId
	}

	set facultyId (value: string) {
		this.set('facultyId', value)
	}

	get institutionId () {
		return this.values.institutionId
	}

	set institutionId (value: string) {
		this.set('institutionId', value)
	}

	addCourse = (value: string) => this.set('courses', [...new Set([...this.values.courses, value])])

	removeCourse = (value: string) => this.set('courses', this.values.courses.filter((course) => course !== value))

	loadEntity = (entity: ClassEntity) => {
		this.name = entity.name
		this.institutionId = entity.school.institutionId
		this.facultyId = entity.school.facultyId
		this.departmentId = entity.school.departmentId
		this.description = entity.description
		this.courses = entity.courses
		this.photo = entity.photo
	}

	toModel = async () => {
		if (this.valid) {
			const {
				name,
				institutionId,
				facultyId,
				departmentId,
				description,
				courses,
				photo
			} = this.validValues
			return {
				name, description, courses, photo: photo as Media,
				school: { institutionId, facultyId, departmentId }
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
