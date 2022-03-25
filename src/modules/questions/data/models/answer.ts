import { UserBio, UserRoles } from '@modules/users'
import { Media } from '@modules/core'

export interface AnswerFromModel extends AnswerToModel {
	id: string
	createdAt: number
	updatedAt: number
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	best: boolean
	votes: { userId: string, vote: 1 | -1 }[]
}

export interface AnswerToModel {
	title: string
	body: string
	questionId: string
	attachments: Media[]
}
