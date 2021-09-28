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
		if (this.action === 'questions') return `/questions/${this.data.questionId}`
		else if (this.action === 'answers') return `/questions/${this.data.questionId}#${this.data.answerId}`
		else if (this.action === 'questionComments') return `/questions/${this.data.questionId}`
		else if (this.action === 'answerComments') return `/questions/${this.data.questionId}#${this.data.answerId}`
		else if (this.action === 'sessions') return `/sessions/${this.data.userId}`
		else if (this.action === 'users') return `/users/${this.data.userId}`
		else if (this.action === 'account') {
			if (this.data.wallet) return '/account/e-wallet'
			else return '/account/'
		} else if (this.action === 'roles') {
			if (this.data.admin) return '/admin/users/admins'
			if (this.data.tutor) return '/admin/users/tutors'
		}
		return '/dashboard'
	}
}

type NotificationConstructorArgs = {
	id: string, body: string, action: string, userId: string, data: Record<string, any>
	createdAt: number, seen: boolean, updatedAt: number
}
