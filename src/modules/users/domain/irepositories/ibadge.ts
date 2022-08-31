import { Listeners } from '@modules/core'
import { BadgeEntity } from '../entities/badge'

export interface IBadgeRepository {
	get: () => Promise<BadgeEntity>
	listenToOne: (id: string, listener: Listeners<BadgeEntity>) => Promise<() => void>
}
