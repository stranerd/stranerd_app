import { BaseEntity } from '@modules/core'
import { EmbeddedUser, generateEmbeddedUser } from '@modules/users'

export class SessionEntity extends BaseEntity {
	readonly id: string
	readonly message: string
	readonly student: EmbeddedUser
	readonly tutor: EmbeddedUser
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
					 id, duration, price, message, student, tutor,
					 accepted, done, createdAt, cancelled, endedAt,
					 updatedAt, startedAt
				 }: SessionConstructorArgs) {
		super()
		this.id = id
		this.message = message
		this.student = generateEmbeddedUser(student)
		this.tutor = generateEmbeddedUser(tutor)
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
		return this.student.bio.photo
	}

	get tutorAvatar () {
		return this.tutor.bio.photo
	}

	get isStudentVerified () {
		return this.student.roles.isVerified
	}

	get isTutorVerified () {
		return this.tutor.roles.isVerified
	}
}

type SessionConstructorArgs = {
	id: string, duration: number, price: number, message: string,
	student: EmbeddedUser, tutor: EmbeddedUser,
	accepted: boolean | null, done: boolean,
	cancelled: { tutor: boolean, student: boolean },
	createdAt: number,
	updatedAt: number,
	startedAt: number | null
	endedAt: number | null
}
