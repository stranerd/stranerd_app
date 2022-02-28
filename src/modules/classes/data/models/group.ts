import { ClassUsers } from '../../domain/entities/class'

export interface GroupFromModel extends GroupToModel {
	id: string
	users: Record<ClassUsers, string[]>
	createdAt: number
	updatedAt: number
}

export interface GroupToModel {
	name: string
	classId: string
}
