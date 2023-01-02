import { BaseEntity } from '@modules/core'
import { EmbeddedUser } from '@modules/users'

export class FlashCardEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly set: { question: string, answer: string }[]
	public readonly user: EmbeddedUser
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             set,
		             user,
		             createdAt,
		             updatedAt
	             }: FlashCardConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.set = set
		this.user = user
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get shareLink () {
		return `/study/flashCards/${this.id}`
	}

	search (search: string) {
		return this.title.toLowerCase().includes(search.toLowerCase()) || JSON.stringify(this.set).toLowerCase().includes(search.toLowerCase())
	}
}

type FlashCardConstructorArgs = {
	id: string,
	title: string,
	set: { question: string, answer: string }[]
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}
