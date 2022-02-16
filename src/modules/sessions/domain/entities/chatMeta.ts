import { BaseEntity } from '@modules/core'
import { generateDefaultBio, UserBio, UserRoles } from '@modules/users'
import { ChatEntity } from './chat'

export class ChatMetaEntity extends BaseEntity {
	readonly id: string
	readonly unRead: string[]
	readonly ownerId: string
	readonly userId: string
	readonly userBio: UserBio
	readonly userRoles: UserRoles
	readonly last: ChatEntity
	readonly createdAt: number
	readonly updatedAt: number

	constructor ({
		             id,
		             unRead,
		             userBio,
		             userId,
		             userRoles,
		             ownerId,
		             last,
		             createdAt,
		             updatedAt
	             }: ChatMetaConstructorArgs) {
		super()
		this.id = id
		this.userId = userId
		this.ownerId = ownerId
		this.unRead = unRead
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = userRoles
		this.last = last
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get avatar () {
		return this.userBio.photo
	}

	get fullName () {
		return this.userBio.fullName
	}
}

type ChatMetaConstructorArgs = {
	id: string
	unRead: string[]
	ownerId: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	last: ChatEntity
	createdAt: number
	updatedAt: number
}
