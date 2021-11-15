import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ReferralFromModel } from '../models/referral'

export interface ReferralBaseDataSource {
	find: (user: string, id: string) => Promise<ReferralFromModel | null>
	get: (user: string, query: QueryParams) => Promise<QueryResults<ReferralFromModel>>
	listenToMany: (user: string, query: QueryParams, listener: Listeners<ReferralFromModel>) => Promise<() => void>
	listenToOne: (user: string, id: string, listener: Listeners<ReferralFromModel>) => Promise<() => void>
}
