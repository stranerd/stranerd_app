import { EmbeddedUser } from '../../domain/types'

export interface ConnectFromModel extends ConnectToModel {
	id: string
	from: EmbeddedUser
	to: EmbeddedUser
	pending: boolean
	accepted: boolean
	createdAt: number
	updatedAt: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectToModel {
}
