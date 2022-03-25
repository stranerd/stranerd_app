import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ReferralEntity } from '../entities/referral'

export interface IReferralRepository {
	get: (query: QueryParams) => Promise<QueryResults<ReferralEntity>>
	listenToOne: (id: string, listener: Listeners<ReferralEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<ReferralEntity>, matches: (entity: ReferralEntity) => boolean) => Promise<() => void>
}
