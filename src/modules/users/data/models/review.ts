import { UserBio, UserRoles } from '../../domain/types'

export interface ReviewFromModel extends ReviewToModel {
	id: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
}

export interface ReviewToModel {
	review: string
	rating: number
	tutorId: string
}
