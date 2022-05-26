import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { DocumentFromModel, DocumentToModel } from '../models/document'

export interface DocumentBaseDataSource {
	create: (data: DocumentToModel) => Promise<DocumentFromModel>
	update: (id: string, data: DocumentToModel) => Promise<DocumentFromModel>
	get: (query: QueryParams) => Promise<QueryResults<DocumentFromModel>>
	listenToOne: (id: string, listener: Listeners<DocumentFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<DocumentFromModel>) => Promise<() => void>
	find: (id: string) => Promise<DocumentFromModel | null>
	delete: (id: string) => Promise<void>
}
