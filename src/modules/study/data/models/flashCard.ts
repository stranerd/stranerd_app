import { UserBio } from '@modules/users'

export interface FlashCardFromModel extends FlashCardToModel {
	id: string,
	userId: string
	userBio: UserBio
	createdAt: number
	updatedAt: number
}

export interface FlashCardToModel {
	set: { question: string, answer: string }[]
	tags: string[]
}
