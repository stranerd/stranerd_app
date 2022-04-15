import { generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'
import { BaseEntity, Media, parseMedia } from '@modules/core'

type ClassConstructorArgs = {
	id: string
	name: string
	description: string
	photo: Media | null
	coverPhoto: Media | null
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
	public readonly coverPhoto: Media | null
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly users: Record<ClassUsers, string[]>
	public readonly requests: string[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, name, description, photo, coverPhoto,
		             createdAt, userId, userBio, userRoles,
		             users, updatedAt, requests
	             }: ClassConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.description = description
		this.photo = photo ? parseMedia(photo) : null
		this.coverPhoto = coverPhoto ? parseMedia(coverPhoto) : null
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = generateDefaultRoles(userRoles)
		this.users = users
		this.requests = requests
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.userRoles.isVerified
	}

	get avatar () {
		return null
	}

	get membersAndRequests () {
		return this.users[ClassUsers.members].concat(this.requests)
	}

	get members () {
		return this.users[ClassUsers.members]
	}

	get admins () {
		return this.users[ClassUsers.admins]
	}

	get tutors () {
		return this.users[ClassUsers.tutors]
	}

	get participants () {
		return this.users[ClassUsers.members].filter((id) => !this.admins.includes(id) && !this.tutors.includes(id))
	}
}

