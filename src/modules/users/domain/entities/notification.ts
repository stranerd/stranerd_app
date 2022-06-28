import { BaseEntity } from '@modules/core'
import { NotificationData, NotificationType } from '../types'

export class NotificationEntity extends BaseEntity {
	public readonly id: string
	public readonly userId: string
	public readonly data: NotificationData
	public readonly body: string
	public readonly seen: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, userId, data, body, createdAt, updatedAt, seen }: NotificationConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.data = data
		this.userId = userId
		this.seen = seen
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get link () {
		return NotificationEntity.getLink(this.data)
	}

	static getLink (not: NotificationData) {
		if (not.type === NotificationType.answers) return `/questions/${not.questionId}`
		else if (not.type === NotificationType.sessions) return `/messages/personal/${not.userId}`
		else if (not.type === NotificationType.users) return `/users/${not.userId}`
		else if (not.type === NotificationType.account) return '/account'
		else if (not.type === NotificationType.classes) return `/classes/${not.classId}`
		else if (not.type === NotificationType.classAnnouncements) return `/classes/${not.classId}/announcements`
		else if (not.type === NotificationType.classEvents) return `/classes/${not.classId}/events`
		return '/dashboard'
	}
}

type NotificationConstructorArgs = {
	id: string, body: string, userId: string, data: NotificationData
	createdAt: number, seen: boolean, updatedAt: number
}
