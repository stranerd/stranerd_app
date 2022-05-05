import { BaseEntity } from '@modules/core'
import { EmbeddedUser, generateEmbeddedUser } from '@modules/users'
import { ChatEntity } from './chat'

export class ChatMetaEntity extends BaseEntity {
	readonly id: string
	readonly unRead: string[]
	readonly ownerId: string
	readonly user: EmbeddedUser
	readonly last: ChatEntity
	readonly createdAt: number
	readonly updatedAt: number

	constructor ({
		             id,
		             unRead,
		             user,
		             ownerId,
		             last,
		             createdAt,
		             updatedAt
	             }: ChatMetaConstructorArgs) {
		super()
		this.id = id
		this.user = generateEmbeddedUser(user)
		this.ownerId = ownerId
		this.unRead = unRead
		this.last = last
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.user.roles.isVerified
	}
}

type ChatMetaConstructorArgs = {
	id: string
	unRead: string[]
	ownerId: string
	user: EmbeddedUser
	last: ChatEntity
	createdAt: number
	updatedAt: number
}
