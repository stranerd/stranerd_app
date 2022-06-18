import { BaseEntity } from '@modules/core'
import { EmbeddedUser } from '../types'

export class ConnectEntity extends BaseEntity {
	public readonly id: string
	public readonly from: EmbeddedUser
	public readonly to: EmbeddedUser
	public readonly pending: boolean
	public readonly accepted: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, from, to, pending, accepted, createdAt, updatedAt }: ConnectConstructorArgs) {
		super()
		this.id = id
		this.from = from
		this.to = to
		this.pending = pending
		this.accepted = accepted
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type ConnectConstructorArgs = {
	id: string, from: EmbeddedUser, to: EmbeddedUser, pending: boolean, accepted: boolean
	createdAt: number, updatedAt: number
}
