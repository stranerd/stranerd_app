import { BaseEntity } from '@modules/core'
import { generateDefaultBio, UserBio } from './user'

export class ReviewEntity extends BaseEntity {
	public readonly id: string
	public readonly review: string
	public readonly rating: number
	public readonly tutorId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, review, rating, createdAt, tutorId, userId, userBio, updatedAt }: ReviewConstructorArgs) {
		super()
		this.id = id
		this.review = review
		this.rating = rating
		this.userId = userId
		this.tutorId = tutorId
		this.userBio = generateDefaultBio(userBio)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get avatar () {
		return this.userBio.photo
	}
}

type ReviewConstructorArgs = {
	id: string, review: string, rating: number, tutorId: string
	createdAt: number, userId: string, userBio: UserBio, updatedAt: number
}
