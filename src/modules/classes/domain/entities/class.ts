import { generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'
import { BaseEntity, Media } from '@modules/core'
import { appName } from '@utils/environment'

type ClassConstructorArgs = {
	id: string
	name: string
	description: string
	photo: Media | null
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	users: Record<ClassUsers, string[]>
	requests: string[]
	createdAt: number
	updatedAt: number
}

export enum ClassUsers {
	admins = 'admins',
	tutors = 'tutors',
	members = 'members'
}

export class ClassEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly description: string
	public readonly photo: Media | null
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly users: Record<ClassUsers, string[]>
	public readonly requests: string[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, name, description, photo,
		             createdAt, userId, userBio, userRoles,
		             users, updatedAt, requests
	             }: ClassConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.description = description
		this.photo = photo
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = generateDefaultRoles(userRoles)
		this.users = users
		this.requests = requests
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.userRoles[appName].isVerified
	}
}

