import { EmbeddedUser } from '@modules/users'
import { Media } from '@modules/core'
import { ClassUsers } from '../../domain/types'

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
	school: {
		institutionId: string
		facultyId: string
		departmentId: string
	}
	description: string
	courses: string[]
	photo: Media | null
	coverPhoto: Media | null
}
