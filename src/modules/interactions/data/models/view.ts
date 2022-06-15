import { InteractionEntity } from '../../domain/types'
import { EmbeddedUser } from '@modules/users'

export interface ViewFromModel extends ViewToModel {
	id: string
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}

export interface ViewToModel {
	entity: InteractionEntity
}
