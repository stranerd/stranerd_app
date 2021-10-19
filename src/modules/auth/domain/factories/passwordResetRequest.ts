import { BaseFactory } from '@modules/core'
import { isEmail, isString } from '@stranerd/validate'

type Keys = { email: string }

export class PasswordResetRequestFactory extends BaseFactory<null, Keys, Keys> {
	readonly rules = {
		email: { required: true, rules: [isString, isEmail] }
	}

	reserved = []

	constructor () {
		super({ email: '' })
	}

	get email () {
		return this.values.email
	}

	set email (value: string) {
		this.set('email', value)
	}

	toModel = async () => {
		if (this.valid) {
			return { email: this.validValues.email }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: null) => {
		throw new Error(`Cannot load an entity into this factory, ${entity}`)
	}
}
