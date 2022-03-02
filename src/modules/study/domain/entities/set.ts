import { BaseEntity } from '@modules/core'
import { generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'
import { appName } from '@utils/environment'

export class SetEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly parent: string
	public readonly data: SetData
	public readonly children: string[]
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
		sets: string[]
	}
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             name,
		             parent,
		             data,
		             userId,
		             userBio,
		             userRoles,
		             children,
		             saved,
		             createdAt,
		             updatedAt
	             }: SetConstructorArgs) {
		super()
		this.id = id
		this.parent = parent
		this.data = data
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = generateDefaultRoles(userRoles)
		this.name = !name ? 'My Library' : name
		this.children = children
		this.saved = saved
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get allSaved () {
		return Object.values(this.saved).flat(1).concat(this.children)
	}

	get isUserVerified () {
		return this.userRoles[appName].isVerified
	}

	get shareLink () {
		return `/study/sets/${this.id}`
	}
}

export enum SetType {
	users = 'users',
	classes = 'classes'
}

type UserType = {
	type: SetType.users
}

type ClassType = {
	type: SetType.classes
	classId: string
}

export type SetData = UserType | ClassType

type SetConstructorArgs = {
	id: string
	name: string
	parent: string
	data: SetData
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	children: string[]
	saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
		sets: string[]
	}
	createdAt: number
	updatedAt: number
}
