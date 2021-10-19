import { BaseEntity } from '@modules/core'
import { generateDefaultBio, UserBio } from '@modules/users'

export class SessionEntity extends BaseEntity {
	readonly id: string
	readonly taskId: string | null
	readonly message: string
	readonly studentId: string
	readonly studentBio: UserBio
	readonly tutorId: string
	readonly tutorBio: UserBio
	readonly duration: number
	readonly price: number
	readonly accepted: boolean
	readonly done: boolean
	readonly cancelled: { student: boolean, tutor: boolean }
	readonly createdAt: number
	readonly updatedAt: number
	readonly startedAt: number | null
	readonly endedAt: number | null

	constructor ({
		             id, taskId, duration, price, message,
		             studentId, tutorId, studentBio, tutorBio,
		             accepted, done, createdAt, cancelled, endedAt,
		             updatedAt, startedAt
	             }: SessionConstructorArgs) {
		super()
		this.id = id
		this.taskId = taskId
		this.message = message
		this.studentId = studentId
		this.studentBio = generateDefaultBio(studentBio)
		this.tutorId = tutorId
		this.tutorBio = generateDefaultBio(tutorBio)
		this.duration = duration
		this.price = price
		this.accepted = accepted ?? false
		this.done = done
		this.cancelled = cancelled
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.startedAt = startedAt
		this.endedAt = endedAt
	}

	get studentAvatar () {
		return this.studentBio.photo
	}

	get tutorAvatar () {
		return this.tutorBio.photo
	}
}

type SessionConstructorArgs = {
	id: string, duration: number, price: number, message: string,
	studentId: string, tutorId: string, studentBio: UserBio, tutorBio: UserBio,
	accepted: boolean | null, done: boolean,
	cancelled: { tutor: boolean, student: boolean },
	createdAt: number,
	updatedAt: number,
	startedAt: number | null
	endedAt: number | null
	taskId: string
}
