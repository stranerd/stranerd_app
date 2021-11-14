import { Listeners } from '@modules/core'
import { IBadgeRepository } from '../../domain/irepositories/ibadge'
import { BadgeBaseDataSource } from '../datasources/badge-base'
import { BadgeTransformer } from '../transformers/badge'
import { BadgeEntity } from '../../domain/entities/badge'

export class BadgeRepository implements IBadgeRepository {
	private dataSource: BadgeBaseDataSource
	private transformer: BadgeTransformer

	constructor (dataSource: BadgeBaseDataSource, transformer: BadgeTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async find (userId: string) {
		const model = await this.dataSource.find(userId)
		if (model) return this.transformer.fromJSON(model)
		else return null
	}

	async listenToOne (userId: string, id: string, listener: Listeners<BadgeEntity>) {
		return this.dataSource.listenToOne(userId, id, {
			created: async (model) => {
				await listener.created(this.transformer.fromJSON(model))
			},
			updated: async (model) => {
				await listener.updated(this.transformer.fromJSON(model))
			},
			deleted: async (model) => {
				await listener.deleted(this.transformer.fromJSON(model))
			}
		})
	}
}
