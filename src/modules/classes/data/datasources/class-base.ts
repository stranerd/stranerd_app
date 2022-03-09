import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ClassFromModel, ClassToModel } from '../models/class'
import { ClassUsers } from '@modules/classes/domain/entities/class'

export interface ClassBaseDataSource {
	create: (data: ClassToModel) => Promise<ClassFromModel>
	update: (id: string, data: ClassToModel) => Promise<ClassFromModel>
	get: (query: QueryParams) => Promise<QueryResults<ClassFromModel>>
	listenToOne: (id: string, listener: Listeners<ClassFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<ClassFromModel>) => Promise<() => void>
	find: (id: string) => Promise<ClassFromModel | null>
	delete: (id: string) => Promise<void>
	requestClass: (id: string, request: boolean) => Promise<void>
	leaveClass: (id: string) => Promise<void>
	acceptRequest: (id: string, requestId: string, accept: boolean) => Promise<void>
	addMembers: (id: string, userIds: string[], add: boolean) => Promise<void>
	changeMemberRole: (id: string, userId: string, role: ClassUsers, add: boolean) => Promise<void>
}
