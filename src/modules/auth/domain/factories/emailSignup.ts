import { BaseFactory } from '@modules/core'
import { isEmail, isLongerThanX, isShallowEqualTo, isShorterThanX, isString } from '@stranerd/validate'
import { AuthUser } from '../entities/auth'

type Keys = { first: string, last: string, email: string, password: string, cPassword: string }

export class EmailSignupFactory extends BaseFactory<null, AuthUser, Keys> {
	readonly rules = {
		first: { required: true, rules: [isString, isLongerThanX(2)] },
		last: { required: true, rules: [isString, isLongerThanX(2)] },
		email: { required: true, rules: [isString, isEmail] },
		password: { required: true, rules: [isString, isLongerThanX(7), isShorterThanX(17)] },
		cPassword: {
			required: true,
			rules: [(val: string) => isShallowEqualTo(val, this.password), isLongerThanX(7), isShorterThanX(17)]
		}
	}

	reserved = []

	constructor () {
		super({ first: '', last: '', email: '', password: '', cPassword: '' })
	}

	get first () {
		return this.values.first
	}

	set first (value: string) {
		this.set('first', value)
	}

	get last () {
		return this.values.last
	}

	set last (value: string) {
		this.set('last', value)
	}

	get email () {
		return this.values.email
	}

	set email (value: string) {
		this.set('email', value)
	}

	get password () {
		return this.values.password
	}

	set password (value: string) {
		this.set('password', value)
		this.set('cPassword', '')
	}

	get cPassword () {
		return this.values.cPassword
	}

	set cPassword (value: string) {
		this.set('cPassword', value)
	}

	toModel = async () => {
		if (this.valid) {
			const { first, last, email, password } = this.validValues
			return { firstName: first, lastName: last, email, password }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: null) => {
		throw new Error(`Cannot load an entity into this factory, ${entity}`)
	}
}
