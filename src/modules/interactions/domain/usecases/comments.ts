import { ICommentRepository } from '../irepositories/icomment'
import { CommentFactory } from '../factories/comment'
import { Listeners, QueryParams } from '@modules/core'
import { CommentEntity } from '../entities/comment'
import { InteractionEntity } from '../types'

export class CommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async add (entity: InteractionEntity, factory: CommentFactory) {
		const data = await factory.toModel()
		return await this.repository.add({ ...data, entity })
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async update (entity: InteractionEntity, id: string, factory: CommentFactory) {
		const data = await factory.toModel()
		return await this.repository.update(id, { ...data, entity })
	}

	async find (entity: InteractionEntity, id: string) {
		return await this.repository.find(entity, id)
	}

	async get (entity: InteractionEntity) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.get(entity, conditions)
	}

	async listenToOne (entity: InteractionEntity, id: string, listener: Listeners<CommentEntity>) {
		return await this.repository.listenToOne(entity, id, listener)
	}

	async listen (entity: InteractionEntity, listener: Listeners<CommentEntity>) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(entity, conditions, listener, (entity) => !!entity)
	}
}
