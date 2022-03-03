import { ClassUsers } from '../../domain/entities/class'
import { DiscussionFromModel } from './discussion'

export interface GroupFromModel extends GroupToModel {
	id: string
	users: Record<ClassUsers, string[]>
	last: DiscussionFromModel | null
	createdAt: number
	updatedAt: number
}

export interface GroupToModel {
	name: string
	classId: string
}
