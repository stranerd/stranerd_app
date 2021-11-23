import { BaseEntity } from '@modules/core'

export class CourseEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly institutionId: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, name, institutionId, createdAt, updatedAt }: CourseConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.institutionId = institutionId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type CourseConstructorArgs = { id: string, name: string, institutionId: string, createdAt: number, updatedAt: number }
