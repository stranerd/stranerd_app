import { UserBio, UserRoles } from '@modules/users'
import { SetData } from '../../domain/entities/set'

export interface SetFromModel extends SetToModel {
	id: string
	saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
		sets: string[]
	}
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
}

export interface SetToModel {
	name: string
	data: SetData
}
