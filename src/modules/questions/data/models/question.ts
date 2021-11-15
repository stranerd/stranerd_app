import { UserBio } from '@modules/users'
import { Media } from '@modules/core'

export interface QuestionFromModel extends QuestionToModel {
	id: string
	userId: string
	userBio: UserBio
	bestAnswers: string[]
	answers: { id: string, userId: string }[]
	isAnswered: boolean
	creditable: number
	commentsCount: number
	createdAt: number
	updatedAt: number
}

export interface QuestionToModel {
	body: string
	coins: number
	tags: string[]
	attachments: Media[]
	subjectId: string
}
