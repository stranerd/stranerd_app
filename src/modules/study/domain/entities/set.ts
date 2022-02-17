import { BaseEntity } from '@modules/core'
import { generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'
import { appName } from '@utils/environment'

export class SetEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly parent: string | null
	public readonly isPublic: boolean
	public readonly tags: string[]
	public readonly children: string[]
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
		sets: string[]
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
		             userRoles,
		             children,
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
		this.userRoles = generateDefaultRoles(userRoles)
		this.name = !parent ? 'My Library' : name
		this.children = children
		this.saved = saved
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get allSaved () {
		return Object.values(this.saved).flat(1).concat(this.children)
	}

	get isUserVerified () {
		return this.userRoles[appName].isVerified
	}
}

type SetConstructorArgs = {
	id: string
	name: string
	parent: string | null
	isPublic: boolean
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	tags: string[]
	children: string[]
	saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
		sets: string[]
	}
	createdAt: number
	updatedAt: number
}
