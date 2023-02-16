import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { isEqualTo, v } from 'valleyed'
import { NewUser } from '../entities/auth'

type Content = UploadedFile | Media | null

export class EmailSignupFactory extends BaseFactory<null, NewUser, NewUser & { cPassword: string, photo: Content }> {
	readonly rules = {
		firstName: v.string().min(3),
		lastName: v.string().min(3),
		description: v.string(),
		email: v.string().email(),
		photo: v.file().image().nullable(),
		password: v.string().min(8).max(16),
		cPassword: v.string().min(8).max(16)
			.custom((val) => isEqualTo(this.password)(val).valid, 'is not equal')
	}

	reserved = []

	constructor () {
		super({
			firstName: '', lastName: '', email: '', password: '', cPassword: '',
			description: '', photo: null
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

	get description () {
		return this.values.description
	}

	set description (value: string) {
		this.set('description', value)
	}

	get photo () {
		return this.values.photo
	}

	set photo (value: Content) {
		this.set('photo', value)
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
			const { firstName, lastName, email, password, description, photo } = this.validValues
			return { firstName, lastName, email, password, description, photo }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: null) => {
		throw new Error(`Cannot load an entity into this factory, ${entity}`)
	}
}
