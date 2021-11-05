import { Listeners, QueryParams } from '@modules/core'
import { IReferralRepository } from '../../domain/irepositories/ireferral'
import { ReferralBaseDataSource } from '../datasources/referral-base'
import { ReferralTransformer } from '../transformers/referral'
import { ReferralEntity } from '../../domain/entities/referral'

export class ReferralRepository implements IReferralRepository {
	private dataSource: ReferralBaseDataSource
	private transformer: ReferralTransformer

	constructor (dataSource: ReferralBaseDataSource, transformer: ReferralTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (userId: string, query: QueryParams) {
		const models = await this.dataSource.get(userId, query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listenToOne (userId: string, id: string, listener: Listeners<ReferralEntity>) {
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

	async listenToMany (userId: string, query: QueryParams, listener: Listeners<ReferralEntity>, matches: (entity: ReferralEntity) => boolean) {
		return this.dataSource.listenToMany(userId, query, {
			created: async (model) => {
				const entity = this.transformer.fromJSON(model)
				if (matches(entity)) await listener.created(entity)
			},
			updated: async (model) => {
				const entity = this.transformer.fromJSON(model)
				if (matches(entity)) await listener.updated(entity)
			},
			deleted: async (model) => {
				const entity = this.transformer.fromJSON(model)
				if (matches(entity)) await listener.deleted(entity)
			}
		})
	}
}
