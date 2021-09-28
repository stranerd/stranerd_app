import { BaseEntity } from '@modules/core'

export class SubjectEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, name, createdAt, updatedAt }: SubjectConstructorArgs) {
		super()
		this.id = id
		this.name = capitalize(name)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type SubjectConstructorArgs = { id: string, name: string, createdAt: number, updatedAt: number }

const capitalize = (value: string) => {
	const c = (v: string) => (v[0]?.toUpperCase() ?? '') + v.slice(1)
	return value.trim().split(' ').map(c).join(' ')
}
