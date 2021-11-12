import { BaseFactory } from '@modules/core'
import { hasLessThanX, isArrayOfX, isInvalid, isString, isValid } from '@stranerd/validate'
import { UserEntity } from '@modules/users'
import { TutorUpdate } from '../../data/models/user'

type Keys = { strongestSubject: string, weakerSubjects: string[] }

export class TutorUpdateFactory extends BaseFactory<UserEntity, TutorUpdate, Keys> {
	readonly rules = {
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
		super({ strongestSubject: '', weakerSubjects: [] })
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
			const { strongestSubject, weakerSubjects } = this.validValues
			return { strongestSubject, weakerSubjects }
		} else throw new Error('Validation errors')
	}

	loadEntity = (entity: UserEntity) => {
		if (entity.strongestSubject) this.strongestSubject = entity.strongestSubject
		this.set('weakerSubjects', entity.weakerSubjects)
	}
}
