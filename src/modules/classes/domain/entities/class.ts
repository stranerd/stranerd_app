import { generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'
import { BaseEntity } from '@modules/core'
import { appName } from '@utils/environment'

type ClassConstructorArgs = {
	id: string
	name: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	users: { admins: string[], members: string[], requests: string[] }
	createdAt: number
	updatedAt: number
}

export class ClassEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly users: { admins: string[], members: string[], requests: string[] }
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, name,  
		              createdAt, userId, userBio, userRoles, 
		             users, updatedAt
	             }: ClassConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = generateDefaultRoles(userRoles)
		this.users = users
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get userName () {
		return this.userBio.fullName!
	}

	get avatar () {
		return this.userBio.photo
	}

	get isUserVerified () {
		return this.userRoles[appName].isVerified
	}
}

