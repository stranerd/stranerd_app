import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { InstitutionEntity } from '../entities/institution'
import { InstitutionToModel } from '../../data/models/institution'

export interface IInstitutionRepository {
	add: (data: InstitutionToModel) => Promise<InstitutionEntity>
	get: (query: QueryParams) => Promise<QueryResults<InstitutionEntity>>
	listenToOne: (id: string, listener: Listeners<InstitutionEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<InstitutionEntity>, matches: (entity: InstitutionEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<InstitutionEntity | null>
	update: (id: string, data: InstitutionToModel) => Promise<InstitutionEntity>
	delete: (id: string) => Promise<void>
}
