import { EmbeddedUser } from '@modules/users'
import { Media } from '@modules/core'
import { AnswerMeta } from '../../domain/types'

export interface AnswerFromModel extends AnswerToModel {
	id: string
	createdAt: number
	updatedAt: number
	user: EmbeddedUser
	best: boolean
	tagId: string
	meta: AnswerMeta
}

export interface AnswerToModel {
	body: string
	questionId: string
	attachments: Media[]
}
