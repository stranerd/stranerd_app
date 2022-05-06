import { EmbeddedUser } from '@modules/users'

export interface FlashCardFromModel extends FlashCardToModel {
	id: string,
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}

export interface FlashCardToModel {
	title: string
	set: { question: string, answer: string }[]
}
