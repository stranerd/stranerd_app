import { BaseFactory } from '@modules/core'
import { isEqualTo, v } from 'valleyed'

type Keys = { email: string, token: string, password: string, cPassword: string }

export class PasswordResetFactory extends BaseFactory<null, { password: string, token: string }, Keys> {
	readonly rules = {
		token: v.string().min(5),
		password: v.string().min(8).max(16),
		cPassword: v.string().min(8).max(16)
			.custom((val) => isEqualTo(this.password)(val).valid, 'is not equal'),
		email: v.string().email()
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
