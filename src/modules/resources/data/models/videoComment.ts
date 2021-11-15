import { UserBio } from '@modules/users'

export interface VideoCommentFromModel extends VideoCommentToModel {
	id: string
	userId: string
	userBio: UserBio
	createdAt: number
	updatedAt: number
}

export interface VideoCommentToModel {
	body: string
	videoId: string
}
