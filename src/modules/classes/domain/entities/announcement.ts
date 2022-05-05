import { EmbeddedUser, generateEmbeddedUser } from '@modules/users'
import { BaseEntity } from '@modules/core'
import { ClassUsers } from './class'

type AnnouncementConstructorArgs = {
	id: string
	body: string
	classId: string
	users: Record<ClassUsers, string[]>
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}

export class AnnouncementEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly users: Record<ClassUsers, string[]>
	public readonly classId: string
	public readonly user: EmbeddedUser
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, createdAt, users, classId, user, updatedAt
	             }: AnnouncementConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.users = users
		this.classId = classId
		this.user = generateEmbeddedUser(user)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.user.roles.isVerified
	}

	get members () {
		return this.users[ClassUsers.members]
	}

	get admins () {
		return this.users[ClassUsers.admins]
	}

	get tutors () {
		return this.users[ClassUsers.tutors]
	}
}

