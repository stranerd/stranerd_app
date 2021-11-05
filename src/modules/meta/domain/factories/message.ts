import { BaseFactory } from '@modules/core'
import { isEmail, isLongerThanX, isString } from '@stranerd/validate'
import { MessageToModel } from '../../data/models/message'

type Keys = { firstName: string, lastName: string, email: string, message: string }

export class MessageFactory extends BaseFactory<null, MessageToModel, Keys> {
	public rules = {
		firstName: { required: true, rules: [isString, isLongerThanX(2)] },
		lastName: { required: true, rules: [isString, isLongerThanX(2)] },
		email: { required: true, rules: [isString, isEmail] },
		message: { required: true, rules: [isString, isLongerThanX(0)] }
	}

	reserved = []

	constructor () {
		super({ firstName: '', lastName: '', email: '', message: '' })
	}

	get firstName () {
		return this.values.firstName
	}

	set firstName (value: string) {
		this.set('firstName', value)
	}

	get lastName () {
		return this.values.lastName
	}

	set lastName (value: string) {
		this.set('lastName', value)
	}

	get email () {
		return this.values.email
	}

	set email (value: string) {
		this.set('email', value)
	}

	get message () {
		return this.values.message
	}

	set message (value: string) {
		this.set('message', value)
	}

	public toModel = async () => {
		if (this.valid) {
			const { firstName, lastName, email, message } = this.validValues
			return { firstName, lastName, email, message }
		} else {
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: null) => {
		throw new Error(`Cannot load an entity into this factory, ${entity}`)
	}
}
