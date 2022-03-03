import { BaseEntity } from '@modules/core'
import { ClassUsers } from './class'
import { DiscussionEntity } from './discussion'

type GroupConstructorArgs = {
	id: string
	name: string
	users: Record<ClassUsers, string[]>
	last: DiscussionEntity | null
	classId: string
	createdAt: number
	updatedAt: number
}

export class GroupEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly users: Record<ClassUsers, string[]>
	public readonly last: DiscussionEntity | null
	public readonly classId: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, name, users, last, createdAt, classId, updatedAt
	             }: GroupConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.classId = classId
		this.last = last
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

