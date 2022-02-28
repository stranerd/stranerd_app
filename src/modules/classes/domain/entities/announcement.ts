import { generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'
import { BaseEntity } from '@modules/core'
import { appName } from '@utils/environment'
import { ClassUsers } from './class'

type AnnouncementConstructorArgs = {
	id: string
	body: string
	classId: string
	users: Record<ClassUsers, string[]>
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
}

export class AnnouncementEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly users: Record<ClassUsers, string[]>
	public readonly classId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, createdAt, users, classId, userId, userBio, userRoles, updatedAt
	             }: AnnouncementConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.users = users
		this.classId = classId
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = generateDefaultRoles(userRoles)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.userRoles[appName].isVerified
	}
}

