import { InteractionEntity } from '../../domain/types'
import { EmbeddedUser } from '@modules/users'

export interface LikeFromModel extends LikeToModel {
	id: string
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}

export interface LikeToModel {
	value: boolean
	entity: InteractionEntity
}
