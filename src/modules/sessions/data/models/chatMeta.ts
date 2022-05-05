import { EmbeddedUser } from '@modules/users'
import { ChatFromModel } from './chat'

export interface ChatMetaFromModel {
	id: string
	unRead: string[]
	ownerId: string
	user: EmbeddedUser
	last: ChatFromModel
	createdAt: number
	updatedAt: number
}
