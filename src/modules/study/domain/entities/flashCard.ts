import { BaseEntity } from '@modules/core'
import { generateDefaultBio, UserBio, UserRoles } from '@modules/users'
import { appName } from '@utils/environment'

export class FlashCardEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly isPublic: boolean
	public readonly set: { question: string, answer: string }[]
	public readonly tags: string[]
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             isPublic,
		             set,
		             tags,
		             userId,
		             userBio,
		             userRoles,
		             createdAt,
		             updatedAt
	             }: FlashCardConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.isPublic = isPublic
		this.set = set
		this.tags = tags
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = userRoles
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.userRoles[appName].isVerified
	}
}

type FlashCardConstructorArgs = {
	id: string,
	title: string,
	isPublic: boolean
	set: { question: string, answer: string }[]
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	tags: string[]
	createdAt: number
	updatedAt: number
}
