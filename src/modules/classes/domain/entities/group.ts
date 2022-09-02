import { BaseEntity } from '@modules/core'
import { EmbeddedUser, generateEmbeddedUser } from '@modules/users'
import { ClassUsers } from '@modules/classes/domain/types'

type GroupConstructorArgs = {
	id: string
	name: string
	user: EmbeddedUser
	users: Record<ClassUsers, string[]>
	classId: string
	createdAt: number
	updatedAt: number
}

export class GroupEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly user: EmbeddedUser
	public readonly users: Record<ClassUsers, string[]>
	public readonly classId: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
					 id, name, user, users, createdAt, classId, updatedAt
				 }: GroupConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.classId = classId
		this.user = generateEmbeddedUser(user)
		this.users = users
		this.createdAt = createdAt
		this.updatedAt = updatedAt
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

