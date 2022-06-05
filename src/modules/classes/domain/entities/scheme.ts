import { EmbeddedUser } from '@modules/users'
import { ClassUsers } from '../types'
import { BaseEntity } from '@modules/core'

export class SchemeEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly classId: string
	public readonly user: EmbeddedUser
	public readonly topic: string
	public readonly start: number
	public readonly end: number
	public readonly users: Record<ClassUsers, string[]>
	public readonly readAt: Record<string, number>
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             classId,
		             user,
		             topic,
		             start,
		             end,
		             users,
		             readAt,
		             createdAt,
		             updatedAt
	             }: SchemeConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.user = user
		this.topic = topic
		this.start = start
		this.end = end
		this.classId = classId
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

	getAllUsers () {
		return Array.from(new Set(Object.values(this.users).flat()))
	}
}

type SchemeConstructorArgs = {
	id: string
	title: string
	user: EmbeddedUser
	users: Record<ClassUsers, string[]>
	topic: string
	start: number
	end: number
	classId: string
	readAt: Record<string, number>
	createdAt: number
	updatedAt: number
}
