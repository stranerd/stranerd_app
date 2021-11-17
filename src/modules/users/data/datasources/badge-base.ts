import { Listeners } from '@modules/core'
import { BadgeFromModel } from '../models/badge'

export interface BadgeBaseDataSource {
	listenToOne: (user: string, id: string, listener: Listeners<BadgeFromModel>) => Promise<() => void>
	find: (user: string) => Promise<BadgeFromModel | null>
}
