import { EmbeddedUser } from '@modules/users'
import { Media } from '@modules/core'

export interface AnswerFromModel extends AnswerToModel {
	id: string
	createdAt: number
	updatedAt: number
	user: EmbeddedUser
	best: boolean
	votes: { userId: string, vote: 1 | -1 }[]
}

export interface AnswerToModel {
	title: string
	body: string
	questionId: string
	attachments: Media[]
}
