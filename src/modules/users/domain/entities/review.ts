import { BaseEntity } from '@modules/core'
import { generateEmbeddedUser } from './user'
import { EmbeddedUser } from '../types'

export class ReviewEntity extends BaseEntity {
	public readonly id: string
	public readonly review: string
	public readonly rating: number
	public readonly tutorId: string
	public readonly user: EmbeddedUser
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             review,
		             rating,
		             createdAt,
		             tutorId,
		             user,
		             updatedAt
	             }: ReviewConstructorArgs) {
		super()
		this.id = id
		this.review = review
		this.rating = rating
		this.user = generateEmbeddedUser(user)
		this.tutorId = tutorId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.user.roles.isVerified
	}
}

type ReviewConstructorArgs = {
	id: string, review: string, rating: number, tutorId: string
	createdAt: number, user: EmbeddedUser, updatedAt: number
}
