import { BaseFactory, Media } from '@modules/core'
import {
	hasLessThanX,
	isArrayOfX,
	isEmail,
	isImage,
	isInvalid,
	isLongerThanX,
	isRequiredIf,
	isShallowEqualTo,
	isShorterThanX,
	isString,
	isValid
} from '@stranerd/validate'
import { UserEntity } from '@modules/users'
import { UpdateUser } from '../entities/auth'

type Content = File | Media | undefined
type Keys = { first: string, last: string, email: string, description: string, avatar: Content, oldPassword: string | undefined, password: string | undefined, cPassword: string | undefined, strongestSubject: string, weakerSubjects: string[] }

export class ProfileUpdateFactory extends BaseFactory<UserEntity, UpdateUser, Keys> {
	readonly rules = {
		first: { required: true, rules: [isString, isLongerThanX(2)] },
		last: { required: true, rules: [isString, isLongerThanX(2)] },
		email: { required: true, rules: [isString, isEmail] },
		description: { required: true, rules: [isString] },
		avatar: { required: false, rules: [isImage] },
		oldPassword: { required: false, rules: [isString] },
		password: {
			required: false,
			rules: [isString, (val: any) => isRequiredIf(val, !!this.oldPassword), isLongerThanX(7), isShorterThanX(17)]
		},
		cPassword: {
			required: false,
			rules: [isString, (val: any) => isRequiredIf(val, !!this.oldPassword), (val: string) => isRequiredIf(val, !!this.password), (val: string) => isShallowEqualTo(val, this.password), isLongerThanX(7), isShorterThanX(17)]
		},
		strongestSubject: {
			required: true,
			rules: [isString, (value: string) => this.weakerSubjects.includes(value) ? isInvalid('subject already exist in your weaker subjects') : isValid()]
		},
		weakerSubjects: {
			required: true,
			rules: [isArrayOfX((com) => isString(com).valid, 'string'), hasLessThanX(4)]
		}
	}

	reserved = []

	constructor () {
		super({
			first: '', last: '', email: '', description: '', strongestSubject: '', weakerSubjects: [],
			avatar: undefined, oldPassword: undefined, password: undefined, cPassword: undefined
		})
	}

	get first () {
		return this.values.first
	}

	set first (value: string) {
		this.set('first', value.replaceAll(' ', ''))
	}

	get last () {
		return this.values.last
	}

	set last (value: string) {
		this.set('last', value.replaceAll(' ', ''))
	}

	get email () {
		return this.values.email
	}

	set email (value: string) {
		this.set('email', value)
	}

	get description () {
		return this.values.description
	}

	set description (value: string) {
		this.set('description', value)
	}

	get avatar () {
		return this.values.avatar!
	}

	set avatar (avatar: Content) {
		this.set('avatar', avatar)
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
			this.values.cPassword = this.defaults.strongestSubject
			this.validValues.cPassword = this.defaults.strongestSubject
			this.errors.cPassword = ''
		}
	}

	get strongestSubject () {
		return this.values.strongestSubject
	}

	set strongestSubject (value: string) {
		if (value) this.set('strongestSubject', value)
		else {
			this.values.strongestSubject = this.defaults.strongestSubject
			this.validValues.strongestSubject = this.defaults.strongestSubject
			this.errors.strongestSubject = ''
		}
	}

	get weakerSubjects () {
		return this.values.weakerSubjects
	}

	addWeakerSubjects = (value: string) => {
		if (!this.weakerSubjects.includes(value)) {
			this.set('weakerSubjects', [...this.weakerSubjects, value])
			if (this.strongestSubject) this.set('strongestSubject', this.strongestSubject)
		}
	}

	removeWeakerSubjects = (value: string) => this.set('weakerSubjects', this.weakerSubjects.filter((weakSubject) => weakSubject !== value))

	toModel = async () => {
		if (this.valid) {
			if (this.avatar instanceof File) this.avatar = await this.uploadFile('profiles', this.avatar)

			const {
				first,
				last,
				email,
				description,
				avatar,
				oldPassword,
				password,
				strongestSubject,
				weakerSubjects
			} = this.validValues
			return {
				bio: {
					firstName: first, lastName: last,
					email, description,
					photo: (avatar ?? null) as Media
				},
				passwords: oldPassword
					? {
						oldPassword: oldPassword!,
						newPassword: password!
					}
					: undefined,
				strongestSubject, weakerSubjects
			}
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: UserEntity) => {
		this.first = entity.bio.firstName
		this.last = entity.bio.lastName
		this.email = entity.email
		this.description = entity.description
		this.avatar = entity.avatar ?? undefined
		if (entity.strongestSubject) this.strongestSubject = entity.strongestSubject
		this.set('weakerSubjects', entity.weakerSubjects)
	}
}
