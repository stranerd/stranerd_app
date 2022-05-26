import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { DocumentEntity } from '../entities/document'
import { DocumentToModel } from '../../data/models/document'

export interface IDocumentRepository {
	add: (data: DocumentToModel) => Promise<DocumentEntity>
	get: (query: QueryParams) => Promise<QueryResults<DocumentEntity>>
	listenToOne: (id: string, listener: Listeners<DocumentEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<DocumentEntity>, matches: (entity: DocumentEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<DocumentEntity | null>
	update: (id: string, data: DocumentToModel) => Promise<DocumentEntity>
	delete: (id: string) => Promise<void>
}
