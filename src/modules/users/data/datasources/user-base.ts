import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { TutorUpdate, UserFromModel } from '../models/user'

export interface UserBaseDataSource {
	find: (id: string) => Promise<UserFromModel | null>
	get: (query: QueryParams) => Promise<QueryResults<UserFromModel>>
	listenToOne: (id: string, listener: Listeners<UserFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<UserFromModel>) => Promise<() => void>
	updateStreak: () => Promise<void>
	updateTutor: (tutor: TutorUpdate) => Promise<void>
}
