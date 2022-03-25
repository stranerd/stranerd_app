import { BaseEntity } from '@modules/core'

export class InstitutionEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly isGateway: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, name, isGateway, createdAt, updatedAt }: InstitutionConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.isGateway = isGateway
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type InstitutionConstructorArgs = {
	id: string
	name: string
	isGateway: boolean
	createdAt: number
	updatedAt: number
}
