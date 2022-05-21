import { EmbeddedUser } from '@modules/users'
import { ClassUsers } from '../../domain/types'

export interface AnnouncementFromModel extends AnnouncementToModel {
	id: string
	user: EmbeddedUser
	users: Record<ClassUsers, string[]>
	createdAt: number
	updatedAt: number
}

export interface AnnouncementToModel {
	body: string
	classId: string
	reminder: number | null
}
