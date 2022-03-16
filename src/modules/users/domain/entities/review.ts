import { BaseEntity } from '@modules/core'
import { generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from './user'
import { appName } from '@utils/environment'

export class ReviewEntity extends BaseEntity {
	public readonly id: string
	public readonly review: string
	public readonly rating: number
	public readonly tutorId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             review,
		             rating,
		             createdAt,
		             tutorId,
		             userId,
		             userBio,
		             userRoles,
		             updatedAt
	             }: ReviewConstructorArgs) {
		super()
		this.id = id
		this.review = review
		this.rating = rating
		this.userId = userId
		this.tutorId = tutorId
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = generateDefaultRoles(userRoles)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.userRoles[appName].isVerified
	}
}

type ReviewConstructorArgs = {
	id: string, review: string, rating: number, tutorId: string
	createdAt: number, userId: string, userBio: UserBio, userRoles: UserRoles, updatedAt: number
}
