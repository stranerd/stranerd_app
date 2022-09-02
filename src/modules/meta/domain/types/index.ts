export enum MessageType {
	student = 'student',
	school = 'school'
}

type StudentData = {
	type: MessageType.student
}

type SchoolData = {
	type: MessageType.school
	school: string
	position: string
}

export type MessageData = StudentData | SchoolData
