import { generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'
import { BaseEntity, Media, parseMedia } from '@modules/core'
import { extractTextFromHTML, trimToLength } from '@utils/commons'
import { appName } from '@utils/environment'

type AnnouncementConstructorArgs = {
	id: string
	body: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
}

export class AnnouncementEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, createdAt, userId, userBio, userRoles, updatedAt
	             }: AnnouncementConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = generateDefaultRoles(userRoles)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get userName () {
		return this.userBio.fullName!
	}

	get avatar () {
		return this.userBio.photo
	}

	get trimmedBody () {
		return trimToLength(this.strippedBody, 80)
	}

	get strippedBody () {
		return extractTextFromHTML(this.body)
	}

	get isUserVerified () {
		return this.userRoles[appName].isVerified
	}
}

