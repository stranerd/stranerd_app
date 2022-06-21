import { BaseEntity } from '@modules/core'
import { TagTypes } from '../types'

export class TagEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly type: TagTypes
	public readonly parent: string | null
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, title, type, parent, createdAt, updatedAt
	             }: TagConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.type = type
		this.parent = parent
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type TagConstructorArgs = {
	id: string
	title: string
	type: TagTypes
	parent: string | null
	createdAt: number
	updatedAt: number
}
