import { BaseFactory } from '@modules/core'
import { isEmail, isLongerThanX, isShallowEqualTo, isShorterThanX, isString } from '@stranerd/validate'

type Keys = { email: string, token: string, password: string, cPassword: string }

export class PasswordResetFactory extends BaseFactory<null, { password: string, token: string }, Keys> {
	readonly rules = {
		token: { required: true, rules: [isString, isLongerThanX(4)] },
		password: { required: true, rules: [isString, isLongerThanX(7), isShorterThanX(17)] },
		cPassword: {
			required: true,
			rules: [isString, (val: string) => isShallowEqualTo(val, this.password, 'is not equal to the new password'), isLongerThanX(7), isShorterThanX(17)]
		},
		email: { required: true, rules: [isString, isEmail] }
	}

	reserved = []

	constructor () {
		super({ email: '', password: '', cPassword: '', token: '' })
	}

	get email () {
		return this.values.email
	}

	set email (value: string) {
		this.set('email', value)
	}

	get token () {
		return this.values.token
	}

	set token (value: string) {
		this.set('token', value)
	}

	get password () {
		return this.values.password
	}

	set password (value: string) {
		this.set('password', value)
		this.set('cPassword', this.cPassword)
	}

	get cPassword () {
		return this.values.cPassword!
	}

	set cPassword (value: string) {
		this.set('cPassword', value)
	}

	toModel = async () => {
		if (this.valid) {
			const { password, token } = this.validValues
			return { password, token }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: null) => {
		throw new Error(`Cannot load an entity into this factory, ${entity}`)
	}
}
