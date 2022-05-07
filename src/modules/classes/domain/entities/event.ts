import { EmbeddedUser } from '@modules/users'
import { ClassUsers, EventDataType } from '../types'
import { BaseEntity } from '@modules/core'

export class EventEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly classId: string
	public readonly user: EmbeddedUser
	public readonly data: EventDataType
	public readonly users: Record<ClassUsers, string[]>
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             classId,
		             user,
		             data,
		             users,
		             createdAt,
		             updatedAt
	             }: EventConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.user = user
		this.data = data
		this.classId = classId
		this.users = users
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	getAllUsers () {
		return Array.from(new Set(Object.values(this.users).flat()))
	}
}

type EventConstructorArgs = {
	id: string
	title: string
	user: EmbeddedUser
	users: Record<ClassUsers, string[]>
	data: EventDataType
	classId: string
	createdAt: number
	updatedAt: number
}
