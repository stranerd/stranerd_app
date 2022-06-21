import { TagTypes } from '../../domain/types'

export interface TagFromModel extends TagToModel {
	id: string
	createdAt: number
	updatedAt: number
}

export interface TagToModel {
	title: string
	type: TagTypes
	parent: string | null
}
