import { UserBio } from '@modules/users'

export interface SessionFromModel extends SessionToModel {
	id: string
	price: number
	studentId: string
	studentBio: UserBio
	tutorBio: UserBio
	accepted: boolean | null
	done: boolean
	cancelled: { tutor: boolean, student: boolean }
	createdAt: number
	updatedAt: number
	startedAt: number | null
	endedAt: number | null
	taskId: string
}

export interface SessionToModel {
	message: string
	tutorId: string
	duration: number
}
