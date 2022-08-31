import { BaseFactory } from '@modules/core'
import { arrayContainsX, isEmail, isInvalid, isLongerThanX, isNumber, isString, isValid } from '@stranerd/validate'
import { MessageToModel } from '../../data/models/message'
import { MessageType } from '../types'

type Keys = {
	firstName: string, lastName: string, email: string, message: string, phone: string, country: string
	type: MessageType, school: string, position: string
}

export class MessageFactory extends BaseFactory<null, MessageToModel, Keys> {
	public rules = {
		firstName: { required: true, rules: [isString, isLongerThanX(0)] },
		lastName: { required: true, rules: [isString, isLongerThanX(0)] },
		email: { required: true, rules: [isEmail] },
		phone: {
			required: true, rules: [isString, (phone: any) => {
				const isValidPhone = phone?.startsWith('+') && isNumber(parseInt(phone?.split('+')?.[1])).valid
				return isValidPhone ? isValid() : isInvalid('invalid phone')
			}]
		},
		country: { required: true, rules: [isString, isLongerThanX(0)] },
		message: { required: true, rules: [isString, isLongerThanX(0)] },
		type: {
			required: true,
			rules: [arrayContainsX(Object.values(MessageType), (cur, val) => cur === val)]
		},
		school: { required: () => this.isSchoolType, rules: [isString, isLongerThanX(0)] },
		position: { required: () => this.isSchoolType, rules: [isString, isLongerThanX(0)] }
	}

	reserved = []

	constructor () {
		super({
			firstName: '', lastName: '', email: '', message: '', phone: '', country: '',
			type: MessageType.student, school: '', position: ''
		})
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

	get phone () {
		return this.values.phone
	}

	set phone (value: string) {
		this.set('phone', value)
	}

	get country () {
		return this.values.country
	}

	set country (value: string) {
		this.set('country', value)
	}

	get message () {
		return this.values.message
	}

	set message (value: string) {
		this.set('message', value)
	}

	get school () {
		return this.values.school
	}

	set school (value: string) {
		this.set('school', value)
	}

	get position () {
		return this.values.position
	}

	set position (value: string) {
		this.set('position', value)
	}

	get type () {
		return this.values.type
	}

	set type (value: MessageType) {
		this.set('type', value)
	}

	get isSchoolType () {
		return this.values.type === MessageType.school
	}

	public toModel = async () => {
		if (this.valid) {
			const {
				firstName, lastName, email, message, country, phone, school, position
			} = this.validValues
			return {
				firstName, lastName, email, message, country, phone,
				data: this.isSchoolType ? { type: MessageType.school, school, position } : { type: MessageType.student }
			} as MessageToModel
		} else {
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: null) => {
		throw new Error(`Cannot load an entity into this factory, ${entity}`)
	}
}
