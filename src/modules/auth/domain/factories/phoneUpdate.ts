import { BaseFactory } from '@modules/core'
import { Phone } from '../entities/auth'
import { UserEntity } from '@modules/users'

export class PhoneUpdateFactory extends BaseFactory<UserEntity, Phone, { phone: Phone | null }> {
	readonly rules = {
		phone: { required: true, rules: [] }
	}

	reserved = []

	constructor () {
		super({ phone: null })
	}

	get phone () {
		return this.values.phone
	}

	set phone (phone: Phone | null) {
		this.set('phone', phone)
	}

	toModel = async () => {
		if (this.valid) {
			const { phone } = this.validValues
			return phone!
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: UserEntity) => {
		this.phone = entity.bio.phone
	}
}
