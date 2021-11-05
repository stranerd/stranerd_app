import { Listeners, QueryParams } from '@modules/core'
import { IReportRepository } from '../../domain/irepositories/ireport'
import { ReportBaseDataSource } from '../datasources/report-base'
import { ReportTransformer } from '../transformers/report'
import { ReportToModel } from '../models/report'
import { ReportEntity } from '../../domain/entities/report'

export class ReportRepository implements IReportRepository {
	private dataSource: ReportBaseDataSource
	private transformer: ReportTransformer

	constructor (dataSource: ReportBaseDataSource, transformer: ReportTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async add (data: ReportToModel) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		if (model) return this.transformer.fromJSON(model)
		else return null
	}

	async get (query: QueryParams) {
		const models = await this.dataSource.get(query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async delete (id: string) {
		return await this.dataSource.delete(id)
	}

	async listenToOne (id: string, listener: Listeners<ReportEntity<any>>) {
		return this.dataSource.listenToOne(id, {
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

	async listenToMany (query: QueryParams, listener: Listeners<ReportEntity<any>>, matches: (entity: ReportEntity<any>) => boolean) {
		return this.dataSource.listenToMany(query, {
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
