import { UserBio, UserRoles } from '@modules/users'

export interface CommentFromModel extends CommentToModel {
	id: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
}

export interface CommentToModel {
	body: string
	answerId?: string
	questionId?: string
}
