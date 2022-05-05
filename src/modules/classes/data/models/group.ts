import { ClassUsers } from '../../domain/entities/class'
import { DiscussionFromModel } from './discussion'
import { EmbeddedUser } from '@modules/users'

export interface GroupFromModel extends GroupToModel {
	id: string
	user: EmbeddedUser
	users: Record<ClassUsers, string[]>
	last: DiscussionFromModel | null
	createdAt: number
	updatedAt: number
}

export interface GroupToModel {
	name: string
	classId: string
}
