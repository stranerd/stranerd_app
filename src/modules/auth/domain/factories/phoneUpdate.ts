import { BaseFactory } from '@modules/core'
import { Phone } from '../entities/auth'
import { UserEntity } from '@modules/users'
import { isInvalid, isNumber, isString, isValid } from '@stranerd/validate'

export class PhoneUpdateFactory extends BaseFactory<UserEntity, Phone, { phone: Phone | null }> {
	readonly rules = {
		phone: { required: true, rules: [isValidPhone] }
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


export const isValidPhone = (value: any) => {
	const phone = value as { code: string, number: string }
	const { code = '', number = '' } = phone ?? {}
	const isValidCode = isString(code).valid &&
		code.startsWith('+') &&
		isNumber(parseInt(code.slice(1))).valid
	const isValidNumber = isNumber(parseInt(number)).valid
	if (!isValidCode) return isInvalid('invalid phone code')
	if (!isValidNumber) return isInvalid('invalid phone number')
	return isValid()
}
