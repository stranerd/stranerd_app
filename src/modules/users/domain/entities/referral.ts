import { BaseEntity } from '@modules/core'

export class ReferralEntity extends BaseEntity {
	public readonly id: string
	public readonly userId: string
	public readonly referred: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, userId, referred, createdAt, updatedAt }: ReferralConstructorArgs) {
		super()
		this.id = id
		this.userId = userId
		this.referred = referred
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type ReferralConstructorArgs = {
	id: string, referred: string, userId: string, createdAt: number, updatedAt: number
}
