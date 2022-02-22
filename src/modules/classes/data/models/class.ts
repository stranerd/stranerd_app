import { UserBio, UserRoles } from '@modules/users'
import { Media } from '@modules/core'

export interface ClassFromModel extends ClassToModel {
	id: string
	createdAt: number
	updatedAt: number
	userId: string
    userBio: UserBio
    userRoles: UserRoles
    users: { admins: string[], members: string[], requests: string[] }[]
	

}

export interface ClassToModel {
	name: string
}
