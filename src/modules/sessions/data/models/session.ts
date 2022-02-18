import { UserBio, UserRoles } from '@modules/users'

export interface SessionFromModel extends SessionToModel {
	id: string
	price: number
	studentId: string
	studentBio: UserBio
	studentRoles: UserRoles
	tutorBio: UserBio
	tutorRoles: UserRoles
	accepted: boolean | null
	done: boolean
	cancelled: { tutor: boolean, student: boolean }
	createdAt: number
	updatedAt: number
	startedAt: number | null
	endedAt: number | null
}

export interface SessionToModel {
	message: string
	tutorId: string
	duration: number
}
