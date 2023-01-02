import { BaseFactory } from '@modules/core'
import { isString } from '@stranerd/validate'
import { Phone } from '../entities/auth'
import { UserEntity } from '@modules/users'

export class PhoneUpdateFactory extends BaseFactory<UserEntity, Phone, Phone> {
	readonly rules = {
		code: { required: true, rules: [isString] },
		number: { required: true, rules: [isString] }
	}

	reserved = []

	constructor () {
		super({ code: '', number: '' })
	}

	get code () {
		return this.values.code
	}

	set code (value: string) {
		this.set('code', value)
	}

	get number () {
		return this.values.number
	}

	set number (value: string) {
		this.set('number', value)
	}

	toModel = async () => {
		if (this.valid) {
			const { code, number } = this.validValues
			return { code, number }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: UserEntity) => {
		if (entity.bio.phone) {
			this.code = entity.bio.phone.code
			this.number = entity.bio.phone.number
		}
	}
}
