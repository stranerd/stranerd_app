import { UserBio, UserRoles } from '@modules/users'

export interface AnnouncementFromModel extends AnnouncementToModel {
	id: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
	

}

export interface AnnouncementToModel {
	body: string
}
