import { UserBio, UserRoles } from '@modules/users'
import { ChatFromModel } from './chat'

export interface ChatMetaFromModel {
	id: string
	unRead: string[]
	ownerId: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	last: ChatFromModel
	createdAt: number
	updatedAt: number
}
