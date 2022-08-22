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
		if (not.type === NotificationType.NewAnswer) return `/questions/${not.questionId}`
		else if (not.type === NotificationType.NewQuestionComment) return `/questions/${not.questionId}/comments`
		else if (not.type === NotificationType.NewAnswerComment) return `/questions/${not.questionId}/answers/${not.answerId}`
		else if (not.type === NotificationType.ClassAccepted) return `/classes/${not.classId}`
		else if (not.type === NotificationType.ClassRemoved) return `/classes/${not.classId}`
		else if (not.type === NotificationType.ClassTimetableUpdated) return `/classes/${not.classId}/timetable`
		else if (not.type === NotificationType.ClassSchemeUpdated) return `/classes/${not.classId}/schemes`
		else if (not.type === NotificationType.NewClassAnnouncement) return `/classes/${not.classId}/announcements`
		else if (not.type === NotificationType.NewClassTimetableEvent) return `/classes/${not.classId}/timetable`
		else if (not.type === NotificationType.NewClassOneOffEvent) return `/classes/${not.classId}/events`
		else if (not.type === NotificationType.ConnectRequested) return `/users/${not.userId}`
		else if (not.type === NotificationType.ConnectAccepted) return `/users/${not.userId}`
		else if (not.type === NotificationType.ConnectDeclined) return `/users/${not.userId}`
		return '/dashboard'
	}
}

type NotificationConstructorArgs = {
	id: string, body: string, userId: string, data: NotificationData
	createdAt: number, seen: boolean, updatedAt: number
}
