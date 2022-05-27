import { BaseEntity } from '@modules/core'
import { DiscussionEntity } from './discussion'
import { EmbeddedUser, generateEmbeddedUser } from '@modules/users'
import { ClassUsers } from '@modules/classes/domain/types'

type GroupConstructorArgs = {
	id: string
	name: string
	user: EmbeddedUser
	users: Record<ClassUsers, string[]>
	last: DiscussionEntity | null
	classId: string
	readAt: Record<string, number>
	createdAt: number
	updatedAt: number
}

export class GroupEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly user: EmbeddedUser
	public readonly users: Record<ClassUsers, string[]>
	public readonly last: DiscussionEntity | null
	public readonly classId: string
	public readonly readAt: Record<string, number>
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, name, user, users, last, readAt, createdAt, classId, updatedAt
	             }: GroupConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.classId = classId
		this.last = last
		this.user = generateEmbeddedUser(user)
		this.users = users
		this.readAt = readAt
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

	search (search: string) {
		const val = [this.name.toLowerCase().includes(search.toLowerCase())]
		if (this.last) val.push(this.last.search(search))
		return val.some((v) => v)
	}
}

