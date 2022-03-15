import { BaseEntity } from '@modules/core'
import { generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'
import { ChatEntity } from './chat'
import { appName } from '@utils/environment'

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
		this.userRoles = generateDefaultRoles(userRoles)
		this.last = last
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.userRoles[appName].isVerified
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
