import { BaseFactory, Media, UploadedFile } from '@modules/core'
import { isEmail, isImage, isLongerThanX, isShallowEqualTo, isShorterThanX, isString } from '@stranerd/validate'
import { NewUser } from '../entities/auth'

type Content = UploadedFile | Media | null

export class EmailSignupFactory extends BaseFactory<null, NewUser, NewUser & { cPassword: string, photo: Content, coverPhoto: Content }> {
	readonly rules = {
		firstName: { required: true, rules: [isString, isLongerThanX(2)] },
		lastName: { required: true, rules: [isString, isLongerThanX(2)] },
		description: { required: true, rules: [isString] },
		email: { required: true, rules: [isString, isEmail] },
		photo: { required: false, rules: [isImage] },
		coverPhoto: { required: false, rules: [isImage] },
		password: { required: true, rules: [isString, isLongerThanX(7), isShorterThanX(17)] },
		cPassword: {
			required: true,
			rules: [(val: string) => isShallowEqualTo(val, this.password, 'is not equal'), isLongerThanX(7), isShorterThanX(17)]
		}
	}

	reserved = []

	constructor () {
		super({
			firstName: '', lastName: '', email: '', password: '', cPassword: '',
			description: '', photo: null, coverPhoto: null
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

	get coverPhoto () {
		return this.values.coverPhoto
	}

	set coverPhoto (value: Content) {
		this.set('coverPhoto', value)
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
			if (this.photo instanceof UploadedFile) this.photo = await this.uploadFile('profiles', this.photo)
			if (this.coverPhoto instanceof UploadedFile) this.coverPhoto = await this.uploadFile('cover-profiles', this.coverPhoto)
			const { firstName, lastName, email, password, description, photo, coverPhoto } = this.validValues
			return { firstName, lastName, email, password, description, photo, coverPhoto }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: null) => {
		throw new Error(`Cannot load an entity into this factory, ${entity}`)
	}
}
