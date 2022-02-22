import { generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'
import { BaseEntity } from '@modules/core'
import { appName } from '@utils/environment'

type GroupConstructorArgs = {
	id: string
	name: string
	classId: string
	createdAt: number
	updatedAt: number
}

export class GroupEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly classId: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, name,  
		              createdAt, classId, 
		              updatedAt
	             }: GroupConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.classId = classId

		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get className () {
		return this.name
	}


}

