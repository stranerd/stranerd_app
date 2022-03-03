import { isFile, isLongerThanX, isString } from '@stranerd/validate'
import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { ClassEntity } from '../entities/class'
import { ClassToModel } from '../../data/models/class'

type Content = Media | UploadedFile | null
type Keys = { name: string, description: string, photo: Content | null }

export class ClassFactory extends BaseFactory<ClassEntity, ClassToModel, Keys> {
	readonly rules = {
		name: { required: true, rules: [isString, isLongerThanX(2)] },
		description: { required: true, rules: [isString, isLongerThanX(2)] },
		photo: { required: false, rules: [isFile] }
	}

	reserved = []

	constructor () {
		super({ name: '', description: '', photo: null })
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

	get photo () {
		return this.values.photo
	}

	set photo (value: Content) {
		this.set('photo', value)
	}

	loadEntity = (entity: ClassEntity) => {
		this.name = entity.name
		this.description = entity.description
		this.photo = entity.photo
	}

	toModel = async () => {
		if (this.valid) {
			if (this.photo instanceof UploadedFile) this.photo = await this.uploadFile('classes/photos', this.photo)
			const { name, description, photo } = this.validValues
			return { name, description, photo: photo as Media ?? null }
		} else {
			throw new Error('Validation errors')
		}
	}

}
