import { BaseEntity } from '@modules/core'

export class InstitutionEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly isSchool: boolean
	public readonly isGateway: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, name, isSchool, isGateway, createdAt, updatedAt }: InstitutionConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.isSchool = isSchool
		this.isGateway = isGateway
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type InstitutionConstructorArgs = {
	id: string
	name: string
	isSchool: boolean
	isGateway: boolean
	createdAt: number
	updatedAt: number
}
