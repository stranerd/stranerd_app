import { UserBio } from '@modules/users'

export interface SetFromModel extends SetToModel {
	id: string
	saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
	}
	tags: string[]
	isRoot: boolean
	userId: string
	userBio: UserBio
	createdAt: number
	updatedAt: number
}

export interface SetToModel {
	name: string
	isPublic: boolean
	tags: string[]
}
