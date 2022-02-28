import { UserBio, UserRoles } from '@modules/users'
import { Media } from '@modules/core'
import { QuestionData } from '../../domain/entities/question'

export interface QuestionFromModel extends QuestionToModel {
	id: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	bestAnswers: string[]
	answers: { id: string, userId: string }[]
	isAnswered: boolean
	createdAt: number
	updatedAt: number
}

export interface QuestionToModel {
	body: string
	tags: string[]
	attachments: Media[]
	subjectId: string
	data: QuestionData
}
