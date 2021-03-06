import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { SetEntity } from '../entities/set'
import { SetToModel } from '../../data/models/set'

export interface ISetRepository {
	add: (data: SetToModel) => Promise<SetEntity>
	get: (query: QueryParams) => Promise<QueryResults<SetEntity>>
	listenToOne: (id: string, listener: Listeners<SetEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<SetEntity>, matches: (entity: SetEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<SetEntity | null>
	update: (id: string, data: SetToModel) => Promise<SetEntity>
	delete: (id: string) => Promise<void>
	saveProp: (setId: string, type: string, propIds: string[], add: boolean) => Promise<void>
}
