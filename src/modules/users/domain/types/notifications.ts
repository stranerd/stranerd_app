export enum NotificationType {
	NewAnswer = 'NewAnswer',
	NewQuestionComment = 'NewQuestionComment',
	NewAnswerComment = 'NewAnswerComment',
	ClassAccepted = 'ClassAccepted',
	ClassRejected = 'ClassRejected',
	ClassRemoved = 'ClassRemoved',
	ClassSchemeUpdated = 'ClassSchemeUpdated',
	ClassTimetableUpdated = 'ClassTimetableUpdated',
	NewClassAnnouncement = 'NewClassAnnouncement',
	NewClassTimetableEvent = 'NewClassTimetableEvent',
	NewClassOneOffEvent = 'NewClassOneOffEvent',
	ConnectRequested = 'ConnectRequested',
	ConnectAccepted = 'ConnectAccepted',
	ConnectDeclined = 'ConnectDeclined',
}

export type NotificationData =
	{ type: NotificationType.NewAnswer, questionId: string, answerId: string }
	| { type: NotificationType.NewQuestionComment, questionId: string, commentId: string, userId: string }
	| { type: NotificationType.NewAnswerComment, questionId: string, answerId: string, commentId: string, userId: string }
	| { type: NotificationType.ClassAccepted, classId: string }
	| { type: NotificationType.ClassRejected, classId: string }
	| { type: NotificationType.ClassRemoved, classId: string }
	| { type: NotificationType.ClassTimetableUpdated, classId: string, lecturer: string, title: string }
	| { type: NotificationType.ClassSchemeUpdated, classId: string, title: string }
	| { type: NotificationType.NewClassAnnouncement, classId: string, announcementId: string }
	| { type: NotificationType.NewClassTimetableEvent, classId: string, eventId: string, timeInMin: number }
	| { type: NotificationType.NewClassOneOffEvent, classId: string, eventId: string }
	| { type: NotificationType.ConnectRequested, connectId: string, userId: string }
	| { type: NotificationType.ConnectAccepted, connectId: string, userId: string }
	| { type: NotificationType.ConnectDeclined, connectId: string, userId: string }
