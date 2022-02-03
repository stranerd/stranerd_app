import { BaseEntity } from '@modules/core'
import { generateDefaultBio, UserBio } from '@modules/users'

export class SetEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly parent: string | null
	public readonly isPublic: boolean
	public readonly tags: string[]
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
	}
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             name,
		             parent,
		             isPublic,
		             tags,
		             userId,
		             userBio,
		             saved,
		             createdAt,
		             updatedAt
	             }: SetConstructorArgs) {
		super()
		this.id = id
		this.parent = parent
		this.isPublic = isPublic
		this.tags = tags
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.name = !parent ? `${this.userBio.firstName}'s Study` : name
		this.saved = saved
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get allSaved () {
		return Object.values(this.saved).flat(1)
	}
}

type SetConstructorArgs = {
	id: string
	name: string
	parent: string | null
	isPublic: boolean
	userId: string
	userBio: UserBio
	tags: string[]
	saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
	}
	createdAt: number
	updatedAt: number
}
