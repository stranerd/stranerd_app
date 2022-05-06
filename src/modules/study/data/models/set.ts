import { EmbeddedUser } from '@modules/users'

export interface SetFromModel extends SetToModel {
	id: string
	saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
		sets: string[]
	}
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}

export interface SetToModel {
	name: string
}
