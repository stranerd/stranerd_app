import { EmbeddedUser } from '@modules/users'
import { BaseEntity } from '@modules/core'
import { ClassUsers } from '../types'
import { extractUrls } from 'valleyed'

type AnnouncementConstructorArgs = {
	id: string
	body: string
	classId: string
	reminder: number | null
	users: Record<ClassUsers, string[]>
	user: EmbeddedUser
	readAt: Record<string, number>
	createdAt: number
	updatedAt: number
}

export class AnnouncementEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly users: Record<ClassUsers, string[]>
	public readonly classId: string
	public readonly reminder: number | null
	public readonly user: EmbeddedUser
	public readonly readAt: Record<string, number>
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, createdAt, users, classId, reminder, user, readAt, updatedAt
	             }: AnnouncementConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.users = users
		this.classId = classId
		this.reminder = reminder
		this.user = user
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

	get formattedBody () {
		let body = this.body
		extractUrls(body).forEach(({ original, normalized }) => {
			body = body.replaceAll(original, `<a href="${normalized}" target="_blank" style="text-decoration: underline; color: #027eb5;">${original}</a>`)
		})
		return body
	}

	isRead (userId: string) {
		return !!this.readAt[userId]
	}
}
