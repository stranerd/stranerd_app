import { Listeners, QueryParams } from '@modules/core'
import { IDocumentRepository } from '../../domain/irepositories/idocument'
import { DocumentEntity } from '../../domain/entities/document'
import { DocumentBaseDataSource } from '../datasources/document-base'
import { DocumentTransformer } from '../transformers/document'
import { DocumentToModel } from '../models/document'

export class DocumentRepository implements IDocumentRepository {
	private dataSource: DocumentBaseDataSource
	private transformer: DocumentTransformer

	constructor (dataSource: DocumentBaseDataSource, transformer: DocumentTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (query: QueryParams) {
		const models = await this.dataSource.get(query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listenToOne (id: string, listener: Listeners<DocumentEntity>) {
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

	async listenToMany (query: QueryParams, listener: Listeners<DocumentEntity>, matches: (entity: DocumentEntity) => boolean) {
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

	async add (data: DocumentToModel) {
		return this.transformer.fromJSON(await this.dataSource.create(data))
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (id: string, data: DocumentToModel) {
		return this.transformer.fromJSON(await this.dataSource.update(id, data))
	}

	async delete (id: string) {
		return this.dataSource.delete(id)
	}
}
