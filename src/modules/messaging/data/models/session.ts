import { EmbeddedUser } from '@modules/users'

export interface SessionFromModel extends Omit<SessionToModel, 'tutorId'> {
	id: string
	price: number
	student: EmbeddedUser
	tutor: EmbeddedUser
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
