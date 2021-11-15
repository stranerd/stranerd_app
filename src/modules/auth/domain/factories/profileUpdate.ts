import { BaseFactory, Media } from '@modules/core'
import { isImage, isLongerThanX, isString } from '@stranerd/validate'
import { UserEntity } from '@modules/users'
import { ProfileUpdate } from '../entities/auth'

type Content = File | Media | undefined
type Keys = { first: string, last: string, description: string, avatar: Content }

export class ProfileUpdateFactory extends BaseFactory<UserEntity, ProfileUpdate, Keys> {
	readonly rules = {
		first: { required: true, rules: [isString, isLongerThanX(0)] },
		last: { required: true, rules: [isString, isLongerThanX(0)] },
		description: { required: true, rules: [isString] },
		avatar: { required: false, rules: [isImage] }
	}

	reserved = []

	constructor () {
		super({ first: '', last: '', description: '', avatar: undefined })
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

	get avatar () {
		return this.values.avatar!
	}

	set avatar (avatar: Content) {
		this.set('avatar', avatar)
	}

	toModel = async () => {
		if (this.valid) {
			if (this.avatar instanceof File) this.avatar = await this.uploadFile('profiles', this.avatar)

			const {
				first,
				last,
				description,
				avatar
			} = this.validValues
			return {
				firstName: first, lastName: last, description,
				photo: (avatar ?? null) as Media
			}
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: UserEntity) => {
		this.first = entity.bio.firstName
		this.last = entity.bio.lastName
		this.description = entity.description
		this.avatar = entity.avatar ?? undefined
	}
}
