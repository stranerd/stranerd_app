import { EmbeddedUser } from '@modules/users'
import { ClassUsers, EventDataType, EventOneOffType, EventTimetableType, EventType } from '../types'
import { BaseEntity } from '@modules/core'

export class EventEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly classId: string
	public readonly user: EmbeddedUser
	public readonly data: EventDataType
	public readonly users: Record<ClassUsers, string[]>
	public readonly readAt: Record<string, number>
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             classId,
		             user,
		             data,
		             users,
		             readAt,
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
		this.readAt = readAt
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get startDay () {
		if (this.data.type !== EventType.timetable) return -1
		return this.data.start.day
	}

	get startOrder () {
		if (this.data.type !== EventType.timetable) return ''
		const { day, hour, minute } = this.data.start
		return `${day.toString()}${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}${this.createdAt}`
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

	isTimetable (event: EventEntity): event is Omit<EventEntity, 'data'> & { data: EventTimetableType } {
		return event.data?.type === EventType.timetable
	}

	isOneOff (event: EventEntity): event is Omit<EventEntity, 'data'> & { data: EventOneOffType } {
		return event.data?.type === EventType.oneOff
	}

	isRead (userId: string) {
		return !!this.readAt[userId]
	}
}

type EventConstructorArgs = {
	id: string
	title: string
	user: EmbeddedUser
	users: Record<ClassUsers, string[]>
	data: EventDataType
	classId: string
	readAt: Record<string, number>
	createdAt: number
	updatedAt: number
}
