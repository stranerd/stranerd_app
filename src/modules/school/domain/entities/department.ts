import { BaseEntity } from '@modules/core'

export class DepartmentEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly institutionId: string
	public readonly facultyId: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, name, institutionId, facultyId, createdAt, updatedAt }: DepartmentConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.institutionId = institutionId
		this.facultyId = facultyId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type DepartmentConstructorArgs = { id: string, name: string, institutionId: string, facultyId: string, createdAt: number, updatedAt: number }
