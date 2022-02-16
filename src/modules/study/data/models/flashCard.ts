import { UserBio, UserRoles } from '@modules/users'

export interface FlashCardFromModel extends FlashCardToModel {
	id: string,
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
}

export interface FlashCardToModel {
	title: string
	isPublic: boolean
	set: { question: string, answer: string }[]
	tags: string[]
}
