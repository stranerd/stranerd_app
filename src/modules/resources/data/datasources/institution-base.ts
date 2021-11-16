import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { InstitutionFromModel, InstitutionToModel } from '../models/institution'

export interface InstitutionBaseDataSource {
	create: (data: InstitutionToModel) => Promise<string>
	update: (id: string, data: InstitutionToModel) => Promise<void>
	get: (query: QueryParams) => Promise<QueryResults<InstitutionFromModel>>
	listenToOne: (id: string, listener: Listeners<InstitutionFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<InstitutionFromModel>) => Promise<() => void>
	find: (id: string) => Promise<InstitutionFromModel | null>
	delete: (id: string) => Promise<void>
}
