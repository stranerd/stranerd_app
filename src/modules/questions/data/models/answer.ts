import { EmbeddedUser } from '@modules/users'
import { Media } from '@modules/core'

export interface AnswerFromModel extends AnswerToModel {
	id: string
	createdAt: number
	updatedAt: number
	user: EmbeddedUser
	best: boolean
	tagId: string
	votes: { userId: string, vote: 1 | -1 }[]
	comments: number
}

export interface AnswerToModel {
	body: string
	questionId: string
	attachments: Media[]
}
