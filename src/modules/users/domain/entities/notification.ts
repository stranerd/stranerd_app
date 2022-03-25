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
		this.data = data
		this.userId = userId
		this.seen = seen
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get link () {
		return NotificationEntity.getLink({ action: this.action as any, data: this.data as any })
	}

	static getLink (not: NotificationData) {
		if (not.action === 'questions') return `/questions/${not.data.questionId}`
		else if (not.action === 'answers') return `/questions/${not.data.questionId}`
		else if (not.action === 'questionComments') return `/questions/${not.data.questionId}`
		else if (not.action === 'answerComments') return `/questions/${not.data.questionId}`
		else if (not.action === 'sessions') return `/sessions/${not.data.userId}`
		else if (not.action === 'users') return `/users/${not.data.userId}`
		else if (not.action === 'account') {
			if (not.data.wallet) return '/wallet'
			else return '/account'
		} else if (not.action === 'roles') {
			if (not.data.admin) return '/admin/users/admins'
			if (not.data.tutor) return '/admin/users/tutors'
		} else if (not.action === 'classes') return `/classes/${not.data.classId}`
		else if (not.action === 'announcements') return `/classes/${not.data.classId}/announcements`
		return '/dashboard'
	}
}

type NotificationConstructorArgs = {
	id: string, body: string, action: string, userId: string, data: Record<string, any>
	createdAt: number, seen: boolean, updatedAt: number
}

type QuestionData = { action: 'questions', data: { questionId: string } }
type AnswerData = { action: 'answers', data: { questionId: string, answerId: string } }
type QuestionCommentData = { action: 'questionComments', data: { questionId: string, commentId: string } }
type AnswerCommentData = { action: 'answerComments', data: { questionId: string, answerId: string, commentId: string } }
type SessionData = { action: 'sessions', data: { userId: string, sessionId: string } }
type UserData = { action: 'users', data: { userId: string } }
type AccountData = { action: 'account', data: { profile?: true, wallet?: true } }
type RoleData = { action: 'roles', data: { admin?: true, tutor?: true } }
type ClassesData = { action: 'classes', data: { classId: string } }
type AnnouncementData = { action: 'announcements', data: { classId: string, announcementId: string } }

type NotificationData =
	QuestionData
	| AnswerData
	| QuestionCommentData
	| AnswerCommentData
	| SessionData
	| UserData
	| AccountData
	| RoleData
	| ClassesData
	| AnnouncementData
