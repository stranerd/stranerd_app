import { UserBio } from '@modules/users'
import { Media } from '@modules/core'

export interface AnswerFromModel extends AnswerToModel {
	id: string
	coins: number
	tags: string[]
	createdAt: number
	updatedAt: number
	userId: string
	userBio: UserBio
	best: boolean
	votes: { userId: string, vote: 1 | -1 }[]
	commentsCount: number
}

export interface AnswerToModel {
	title: string
	body: string
	questionId: string
	attachments: Media[]
}
