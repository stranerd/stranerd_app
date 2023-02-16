import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { years } from '@utils/constants'
import { v } from 'valleyed'
import { ClassToModel } from '../../data/models/class'
import { ClassEntity } from '../entities/class'

type Content = Media | UploadedFile | null
type Keys = {
	name: string, description: string, courses: string[], photo: Content,
	departmentId: string, facultyId: string, institutionId: string, year: number
}

export class ClassFactory extends BaseFactory<ClassEntity, ClassToModel, Keys> {
	readonly rules = {
		name: v.string().min(3),
		departmentId: v.string().min(1),
		facultyId: v.string().min(1),
		institutionId: v.string().min(1),
		year: v.number(),
		description: v.string().min(3),
		courses: v.array(v.string().min(1)),
		photo: v.file().image().nullable()
	}

	reserved = []

	constructor () {
		super({
			name: '', description: '', courses: [], photo: null,
			departmentId: '', facultyId: '', institutionId: '', year: new Date().getFullYear()
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

	get year () {
		return this.values.year
	}

	set year (value: number) {
		this.set('year', value)
	}

	get years () {
		return years.map((i) => ({ value: i, label: `${i}/${i + 1}` }))
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
				year,
				description,
				courses,
				photo
			} = this.validValues
			return {
				name, description, courses, photo: photo as Media,
				school: { institutionId, facultyId, departmentId, year }
			}
		} else {
			throw new Error('Validation errors')
		}
	}
}
