import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { UserEntity } from '@modules/users'
import { v } from 'valleyed'
import { ProfileUpdate } from '../entities/auth'

type Content = UploadedFile | Media | null
type Keys = { first: string, last: string, description: string, photo: Content }

export class ProfileUpdateFactory extends BaseFactory<UserEntity, ProfileUpdate, Keys> {
	readonly rules = {
		first: v.string().min(1),
		last: v.string().min(1),
		description: v.string(),
		photo: v.file().image().nullable()
	}

	reserved = []

	constructor () {
		super({ first: '', last: '', description: '', photo: null })
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

	toModel = async () => {
		if (this.valid) {
			const { first, last, description, photo } = this.validValues
			return {
				firstName: first, lastName: last, description,
				photo: (photo ?? null) as Media
			}
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: UserEntity) => {
		this.first = entity.bio.firstName
		this.last = entity.bio.lastName
		this.description = entity.bio.description
		this.photo = entity.bio.photo
	}
}
