import { EmbeddedUser } from '@modules/users'
import { Media } from '@modules/core'
import { QuestionMeta } from '../../domain/types'

export interface QuestionFromModel extends QuestionToModel {
	id: string
	user: EmbeddedUser
	bestAnswers: string[]
	answers: { id: string, userId: string }[]
	isAnswered: boolean
	meta: QuestionMeta
	createdAt: number
	updatedAt: number
}

export interface QuestionToModel {
	body: string
	attachments: Media[]
	tagId: string
}
