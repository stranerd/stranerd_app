import { BaseEntity } from '@modules/core'
import { ClassUsers } from './class'

type GroupConstructorArgs = {
	id: string
	name: string
	users: Record<ClassUsers, string[]>
	classId: string
	createdAt: number
	updatedAt: number
}

export class GroupEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly users: Record<ClassUsers, string[]>
	public readonly classId: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, name, users, createdAt, classId, updatedAt
	             }: GroupConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.classId = classId
		this.users = users
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

