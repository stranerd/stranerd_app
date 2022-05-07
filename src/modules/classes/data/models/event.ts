import { EmbeddedUser } from '@modules/users'
import { ClassUsers } from '@modules/classes'
import { EventDataType } from '../../domain/types'

export interface EventFromModel extends EventToModel {
	id: string
	user: EmbeddedUser
	users: Record<ClassUsers, string[]>
	createdAt: number
	updatedAt: number
}

export interface EventToModel {
	classId: string
	title: string
	data: EventDataType
}
