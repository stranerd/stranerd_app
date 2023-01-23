import { CommentMeta, InteractionEntities, InteractionEntity } from '../types'
import { BaseEntity } from '@modules/core'
import { EmbeddedUser } from '@modules/users'

export class CommentEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly entity: InteractionEntity
	public readonly user: EmbeddedUser
	public readonly meta: CommentMeta
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, body, entity, user, meta, createdAt, updatedAt }: CommentConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.entity = entity
		this.user = user
		this.meta = meta
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get canReply () {
		return this.entity.type !== InteractionEntities.comments
	}
}

type CommentConstructorArgs = {
	id: string
	body: string
	entity: InteractionEntity
	user: EmbeddedUser
	meta: CommentMeta
	createdAt: number
	updatedAt: number
}
