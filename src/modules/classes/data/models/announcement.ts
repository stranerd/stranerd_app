import { UserBio, UserRoles } from '@modules/users'
import { ClassUsers } from '../../domain/entities/class'

export interface AnnouncementFromModel extends AnnouncementToModel {
	id: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	users: Record<ClassUsers, string[]>
	createdAt: number
	updatedAt: number
}

export interface AnnouncementToModel {
	body: string
	classId: string
}
