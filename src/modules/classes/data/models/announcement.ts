import { UserBio, UserRoles } from '@modules/users'

export interface AnnouncementFromModel extends AnnouncementToModel {
	id: string
	body: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
	

}

export interface AnnouncementToModel {
	name: string
}
