import { UserBio } from '@modules/users'
import { ChatFromModel } from './chat'

export interface ChatMetaFromModel {
	id: string
	unRead: string[]
	ownerId: string
	userId: string
	userBio: UserBio
	last: ChatFromModel
	createdAt: number
	updatedAt: number
}
