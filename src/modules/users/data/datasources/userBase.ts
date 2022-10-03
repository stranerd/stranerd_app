import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { UserFromModel } from '../models/user'
import { UserSchoolData } from '../../domain/types'

export interface UserBaseDataSource {
	find: (id: string) => Promise<UserFromModel | null>
	get: (query: QueryParams) => Promise<QueryResults<UserFromModel>>
	listenToOne: (id: string, listener: Listeners<UserFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<UserFromModel>) => Promise<() => void>
	updateSchool: (school: UserSchoolData) => Promise<void>
}
