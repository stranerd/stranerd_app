import { BaseEntity } from '@modules/core'
import { generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'
import { appName } from '@utils/environment'

export class FlashCardEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly set: { question: string, answer: string }[]
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             set,
		             userId,
		             userBio,
		             userRoles,
		             createdAt,
		             updatedAt
	             }: FlashCardConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.set = set
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = generateDefaultRoles(userRoles)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.userRoles[appName].isVerified
	}

	get shareLink () {
		return `/study/flashCards/${this.id}`
	}
}

type FlashCardConstructorArgs = {
	id: string,
	title: string,
	set: { question: string, answer: string }[]
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
}
