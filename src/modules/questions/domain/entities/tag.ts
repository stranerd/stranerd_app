import { BaseEntity } from '@modules/core'

export class TagEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly count: number
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, name, count, createdAt, updatedAt }: TagConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.count = count
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type TagConstructorArgs = { id: string, name: string, count: number, createdAt: number, updatedAt: number }
