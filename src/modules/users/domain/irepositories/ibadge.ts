import { Listeners } from '@modules/core'
import { BadgeEntity } from '../entities/badge'

export interface IBadgeRepository {
	find: (userId: string) => Promise<BadgeEntity | null>
	listenToOne: (userId: string, id: string, listener: Listeners<BadgeEntity>) => Promise<() => void>
}
