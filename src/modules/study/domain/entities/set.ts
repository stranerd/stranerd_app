import { BaseEntity } from '@modules/core'
import { UserBio } from '@modules/users'

export class SetEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly isRoot: boolean
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
	}
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, name, isRoot, userId, userBio, saved, createdAt, updatedAt }: SetConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.isRoot = isRoot
		this.userId = userId
		this.userBio = userBio
		this.saved = saved
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type SetConstructorArgs = {
	id: string
	name: string
	isRoot: boolean
	userId: string
	userBio: UserBio
	saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
	}
	createdAt: number
	updatedAt: number
}
