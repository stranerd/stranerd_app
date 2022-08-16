import { Listeners } from '@modules/core'
import { BadgeFromModel } from '../models/badge'

export interface BadgeBaseDataSource {
	listenToOne: (id: string, listener: Listeners<BadgeFromModel>) => Promise<() => void>
	get: () => Promise<BadgeFromModel>
}
