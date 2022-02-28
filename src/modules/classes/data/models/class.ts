import { UserBio, UserRoles } from '@modules/users'
import { ClassUsers } from '../../domain/entities/class'
import { Media } from '@modules/core'

export interface ClassFromModel extends ClassToModel {
	id: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	users: Record<ClassUsers, string[]>
	requests: string[]
	createdAt: number
	updatedAt: number
}

export interface ClassToModel {
	name: string
	description: string
	photo: Media | null
}
