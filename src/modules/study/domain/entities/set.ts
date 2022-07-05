import { BaseEntity } from '@modules/core'
import { EmbeddedUser, generateEmbeddedUser } from '@modules/users'

export enum SetSaved {
	questions = 'questions',
	notes = 'notes',
	flashCards = 'flashCards',
	testPreps = 'testPreps'
}

export class SetEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly user: EmbeddedUser
	public readonly saved: Record<SetSaved, string[]>
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             name,
		             user,
		             saved,
		             createdAt,
		             updatedAt
	             }: SetConstructorArgs) {
		super()
		this.id = id
		this.user = generateEmbeddedUser(user)
		this.name = !name ? 'My Library' : name
		this.saved = saved
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get allSaved () {
		return Object.values(this.saved).flat(1)
	}

	get isUserVerified () {
		return this.user.roles.isVerified
	}

	get shareLink () {
		return `/study/sets/${this.id}`
	}
}

type SetConstructorArgs = {
	id: string
	name: string
	user: EmbeddedUser
	saved: Record<SetSaved, string[]>
	createdAt: number
	updatedAt: number
}
