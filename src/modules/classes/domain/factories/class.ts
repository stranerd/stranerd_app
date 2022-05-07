import { isArrayOfX, isFile, isLongerThan, isLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { ClassEntity } from '../entities/class'
import { ClassToModel } from '../../data/models/class'

type Content = Media | UploadedFile | null
type Keys = { name: string, description: string, courses: string[], photo: Content, coverPhoto: Content }

export class ClassFactory extends BaseFactory<ClassEntity, ClassToModel, Keys> {
	readonly rules = {
		name: { required: true, rules: [isString, isLongerThanX(2)] },
		description: { required: true, rules: [isString, isLongerThanX(2)] },
		courses: {
			required: true,
			rules: [isArrayOfX((cur) => isString(cur).valid && isLongerThan(cur as any, 0).valid, 'strings')]
		},
		photo: { required: false, rules: [isFile] },
		coverPhoto: { required: false, rules: [isFile] }
	}

	reserved = []

	constructor () {
		super({ name: '', description: '', courses: [], photo: null, coverPhoto: null })
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

	get coverPhoto () {
		return this.values.coverPhoto
	}

	set coverPhoto (value: Content) {
		this.set('coverPhoto', value)
	}

	addCourse = (value: string) => this.set('courses', [...new Set([...this.values.courses, value])])

	removeCourse = (value: string) => this.set('courses', this.values.courses.filter((course) => course !== value))

	loadEntity = (entity: ClassEntity) => {
		this.name = entity.name
		this.description = entity.description
		this.courses = entity.courses
		this.photo = entity.photo
		this.coverPhoto = entity.coverPhoto
	}

	toModel = async () => {
		if (this.valid) {
			const { name, description, courses, photo, coverPhoto } = this.validValues
			return { name, description, courses, photo: photo as Media, coverPhoto: coverPhoto as Media }
		} else {
			throw new Error('Validation errors')
		}
	}

}
