import { BaseEntity } from '@modules/core'
import { capitalize } from '@utils/commons'

export class InstitutionEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, name, createdAt, updatedAt }: InstitutionConstructorArgs) {
		super()
		this.id = id
		this.name = capitalize(name)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type InstitutionConstructorArgs = { id: string, name: string, createdAt: number, updatedAt: number }
