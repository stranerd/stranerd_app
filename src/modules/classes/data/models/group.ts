import { EmbeddedUser } from '@modules/users'
import { ClassUsers } from '../../domain/types'

export interface GroupFromModel extends GroupToModel {
	id: string
	user: EmbeddedUser
	users: Record<ClassUsers, string[]>
	createdAt: number
	updatedAt: number
}

export interface GroupToModel {
	name: string
	classId: string
}
