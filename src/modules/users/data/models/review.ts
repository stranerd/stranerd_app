import { EmbeddedUser } from '../../domain/types'

export interface ReviewFromModel extends ReviewToModel {
	id: string
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}

export interface ReviewToModel {
	review: string
	rating: number
	tutorId: string
}
