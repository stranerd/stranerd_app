import { BaseEntity } from '@modules/core'
import { UserBio } from '@modules/users'

export class FlashCardEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly isPublic: boolean
	public readonly set: { question: string, answer: string }[]
	public readonly tags: string[]
	public readonly userId: string
	public readonly userBio: UserBio
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
		this.userBio = userBio
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type FlashCardConstructorArgs = {
	id: string,
	title: string,
	isPublic: boolean
	set: { question: string, answer: string }[]
	userId: string
	userBio: UserBio
	tags: string[]
	createdAt: number
	updatedAt: number
}
