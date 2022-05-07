import { EmbeddedUser } from '@modules/users'
import { ClassUsers } from '../../domain/entities/class'
import { Media } from '@modules/core'

export interface ClassFromModel extends ClassToModel {
	id: string
	user: EmbeddedUser
	users: Record<ClassUsers, string[]>
	requests: string[]
	createdAt: number
	updatedAt: number
}

export interface ClassToModel {
	name: string
	description: string
	courses: string[]
	photo: Media | null
	coverPhoto: Media | null
}
