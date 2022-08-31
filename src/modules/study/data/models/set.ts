import { EmbeddedUser } from '@modules/users'
import { SetSaved } from '../../domain/entities/set'

export interface SetFromModel extends SetToModel {
	id: string
	saved: Record<SetSaved, string[]>
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}

export interface SetToModel {
	name: string
}
