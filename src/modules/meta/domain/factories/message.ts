import { isValidPhone, Phone } from '@modules/auth'
import { BaseFactory } from '@modules/core'
import { v } from 'valleyed'
import { MessageToModel } from '../../data/models/message'
import { MessageType } from '../types'

type Keys = {
	firstName: string, lastName: string, email: string, message: string, phone: Phone, country: string
	type: MessageType, school: string, position: string
}

export class MessageFactory extends BaseFactory<null, MessageToModel, Keys> {
	public rules = {
		firstName: v.string().min(1),
		lastName: v.string().min(1),
		email: v.string().email(),
		phone: v.any().addRule(isValidPhone),
		country: v.string(),
		message: v.string().min(1),
		type: v.any<MessageType>().in(Object.values(MessageType)),
		school: v.string().min(1).requiredIf(() => this.isSchoolType),
		position: v.string().min(1).requiredIf(() => this.isSchoolType)
	}

	reserved = []

	constructor () {
		super({
			firstName: '', lastName: '', email: '', message: '', phone: { code: '', number: '' }, country: '',
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

	set phone (value: Phone) {
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
