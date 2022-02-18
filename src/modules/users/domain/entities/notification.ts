import { BaseEntity } from '@modules/core'

export class NotificationEntity extends BaseEntity {
	public readonly id: string
	public readonly userId: string
	public readonly data: Record<string, any>
	public readonly body: string
	public readonly action: string
	public readonly seen: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, userId, data, body, action, createdAt, updatedAt, seen }: NotificationConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.action = action
		this.data = data ?? {}
		this.userId = userId
		this.seen = seen
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get link () {
		return NotificationEntity.getLink(this.action, this.data)
	}

	static getLink (action: string, data: Record<string, any>) {
		if (action === 'questions') return `/questions/${data.questionId}`
		else if (action === 'answers') return `/questions/${data.questionId}#${data.answerId}`
		else if (action === 'questionComments') return `/questions/${data.questionId}`
		else if (action === 'answerComments') return `/questions/${data.questionId}#${data.answerId}`
		else if (action === 'sessions') return `/sessions/${data.userId}`
		else if (action === 'users') return `/users/${data.userId}`
		else if (action === 'account') {
			if (data.wallet) return '/wallet'
			else return '/account'
		} else if (action === 'roles') {
			if (data.user) return '/admin/users/admins'
			if (data.tutor) return '/admin/users/tutors'
		}
		return '/dashboard'
	}
}

type NotificationConstructorArgs = {
	id: string, body: string, action: string, userId: string, data: Record<string, any>
	createdAt: number, seen: boolean, updatedAt: number
}
