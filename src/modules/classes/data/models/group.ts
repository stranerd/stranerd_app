import { UserBio, UserRoles } from '@modules/users'

export interface AnnouncementFromModel extends AnnouncementToModel {
	id: string
	classId: string
	createdAt: number
	updatedAt: number
	

}

export interface AnnouncementToModel {
	name: string
}
