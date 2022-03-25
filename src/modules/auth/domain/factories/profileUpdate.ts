import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { isImage, isLongerThanX, isString } from '@stranerd/validate'
import { UserEntity } from '@modules/users'
import { ProfileUpdate } from '../entities/auth'

type Content = UploadedFile | Media | null
type Keys = { first: string, last: string, description: string, photo: Content, coverPhoto: Content }

export class ProfileUpdateFactory extends BaseFactory<UserEntity, ProfileUpdate, Keys> {
	readonly rules = {
		first: { required: true, rules: [isString, isLongerThanX(0)] },
		last: { required: true, rules: [isString, isLongerThanX(0)] },
		description: { required: true, rules: [isString] },
		photo: { required: false, rules: [isImage] },
		coverPhoto: { required: false, rules: [isImage] }
	}

	reserved = []

	constructor () {
		super({ first: '', last: '', description: '', photo: null, coverPhoto: null })
	}

	get first () {
		return this.values.first
	}

	set first (value: string) {
		this.set('first', value.replaceAll(' ', ''))
	}

	get last () {
		return this.values.last
	}

	set last (value: string) {
		this.set('last', value.replaceAll(' ', ''))
	}

	get description () {
		return this.values.description
	}

	set description (value: string) {
		this.set('description', value)
	}

	get photo () {
		return this.values.photo!
	}

	set photo (photo: Content) {
		this.set('photo', photo)
	}

	get coverPhoto () {
		return this.values.coverPhoto!
	}

	set coverPhoto (coverPhoto: Content) {
		this.set('coverPhoto', coverPhoto)
	}

	toModel = async () => {
		if (this.valid) {
			if (this.photo instanceof UploadedFile) this.photo = await this.uploadFile('profiles', this.photo)
			if (this.coverPhoto instanceof UploadedFile) this.coverPhoto = await this.uploadFile('cover-profiles', this.coverPhoto)

			const {
				first, last, description, photo, coverPhoto
			} = this.validValues
			return {
				firstName: first, lastName: last, description,
				photo: (photo ?? null) as Media,
				coverPhoto: (coverPhoto ?? null) as Media
			}
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: UserEntity) => {
		this.first = entity.bio.firstName
		this.last = entity.bio.lastName
		this.description = entity.bio.description
		this.photo = entity.bio.photo
		this.coverPhoto = entity.bio.coverPhoto
	}
}
