import { BaseEntity } from '@modules/core'

export class TagEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly parent: string | null
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, title, parent, createdAt, updatedAt
	             }: TagConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.parent = parent
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type TagConstructorArgs = {
	id: string
	title: string
	parent: string | null
	createdAt: number
	updatedAt: number
}
