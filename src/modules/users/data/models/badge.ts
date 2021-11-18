import { BadgeAllBadges, BadgeBadges, BadgeData } from '../../domain/entities/badge'

export interface BadgeToModel {
	data: BadgeData
	badges: BadgeBadges
}

export interface BadgeFromModel extends BadgeToModel {
	id: string
	userId: string
	allBadges: BadgeAllBadges
	createdAt: number
	updatedAt: number
}
