import { EmbeddedUser } from '@modules/users'
import { ClassUsers } from '@modules/classes'

export interface SchemeFromModel extends SchemeToModel {
	id: string
	user: EmbeddedUser
	users: Record<ClassUsers, string[]>
	readAt: Record<string, number>
	createdAt: number
	updatedAt: number
}

export interface SchemeToModel {
	classId: string
	title: string
	topic: string
	start: number
	end: number
}
