import { ClassUsers } from '../../domain/entities/class'
import { DiscussionFromModel } from './discussion'
import { UserBio, UserRoles } from '@modules/users'

export interface GroupFromModel extends GroupToModel {
	id: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	users: Record<ClassUsers, string[]>
	last: DiscussionFromModel | null
	createdAt: number
	updatedAt: number
}

export interface GroupToModel {
	name: string
	classId: string
}
