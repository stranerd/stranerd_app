import { UserBio } from '@modules/users'

export interface CommentToModel {
	body: string
	answerId?: string
	questionId?: string
}

export interface CommentFromModel extends CommentToModel {
	id: string
	userId: string
	userBio: UserBio
	createdAt: number
	updatedAt: number
}


