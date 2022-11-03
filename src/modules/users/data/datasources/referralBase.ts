import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ReferralFromModel } from '../models/referral'

export interface ReferralBaseDataSource {
	find: (id: string) => Promise<ReferralFromModel | null>
	get: (query: QueryParams) => Promise<QueryResults<ReferralFromModel>>
	listenToMany: (query: QueryParams, listener: Listeners<ReferralFromModel>) => Promise<() => void>
	listenToOne: (id: string, listener: Listeners<ReferralFromModel>) => Promise<() => void>
}
