import { BaseFactory } from '@modules/core'
import { isEqualTo, v } from 'valleyed'
import { PasswordUpdate } from '../entities/auth'

type Keys = { oldPassword: string, password: string, cPassword: string }

export class PasswordUpdateFactory extends BaseFactory<null, PasswordUpdate, Keys> {
	readonly rules = {
		oldPassword: v.string(),
		password: v.string().min(8).max(16),
		cPassword: v.string().min(8).max(16)
			.custom((val) => isEqualTo(this.password)(val).valid, 'is not equal')
	}

	reserved = []

	constructor () {
		super({ oldPassword: '', password: '', cPassword: '' })
	}

	get oldPassword () {
		return this.values.oldPassword!
	}

	set oldPassword (value: string) {
		this.set('oldPassword', value)
		this.set('password', this.password)
		this.set('cPassword', this.cPassword)
	}

	get password () {
		return this.values.password!
	}

	set password (value: string) {
		this.set('password', value)
		this.set('cPassword', this.cPassword)
	}

	get cPassword () {
		return this.values.cPassword!
	}

	set cPassword (value: string) {
		if (value || this.password) this.set('cPassword', value)
		else {
			this.values.cPassword = this.defaults.cPassword
			this.validValues.cPassword = this.defaults.cPassword
			this.errors.cPassword = ''
		}
	}

	toModel = async () => {
		if (this.valid) {

			const { oldPassword, password } = this.validValues
			return { oldPassword, password }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: null) => {
		throw new Error(`Cannot load an entity into this factory, ${entity}`)
	}
}
