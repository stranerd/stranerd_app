export enum NotificationType {
	answers = 'answers',
	sessions = 'sessions',
	users = 'users',
	account = 'account',
	classes = 'classes',
	classAnnouncements = 'classAnnouncements',
	classEvents = 'classEvents'
}

type AnswerData = { type: NotificationType.answers, questionId: string, answerId: string }
type SessionData = { type: NotificationType.sessions, userId: string, sessionId: string }
type UserData = { type: NotificationType.users, userId: string }
type AccountData = { type: NotificationType.account, profile: true }
type ClassesData = { type: NotificationType.classes, classId: string }
type AnnouncementData = { type: NotificationType.classAnnouncements, classId: string, announcementId: string }
type ClassEventsData = { type: NotificationType.classEvents, classId: string, eventId: string }

export type NotificationData =
	AnswerData
	| SessionData
	| UserData
	| AccountData
	| AnnouncementData
	| ClassesData
	| ClassEventsData
