import { EmbeddedUser } from '@modules/users'
import { Media } from '@modules/core'
import { QuestionData } from '../../domain/entities/question'

export interface QuestionFromModel extends QuestionToModel {
	id: string
	user: EmbeddedUser
	bestAnswers: string[]
	answers: { id: string, userId: string }[]
	isAnswered: boolean
	createdAt: number
	updatedAt: number
}

export interface QuestionToModel {
	body: string
	attachments: Media[]
	subject: string
	data: QuestionData
}
