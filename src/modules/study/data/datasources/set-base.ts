import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { SetFromModel, SetToModel } from '../models/set'

export interface SetBaseDataSource {
	create: (data: SetToModel) => Promise<SetFromModel>
	update: (id: string, data: SetToModel) => Promise<SetFromModel>
	get: (query: QueryParams) => Promise<QueryResults<SetFromModel>>
	listenToOne: (id: string, listener: Listeners<SetFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<SetFromModel>) => Promise<() => void>
	find: (id: string) => Promise<SetFromModel | null>
	delete: (id: string) => Promise<void>
	saveProp: (setId: string, type: string, propIds: string[]) => Promise<void>
	deleteProp: (setId: string, type: string, propIds: string[]) => Promise<void>
}
