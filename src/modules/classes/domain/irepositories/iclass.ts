import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ClassToModel } from '../../data/models/class'
import { ClassEntity, ClassUsers } from '../entities/class'

export interface IClassRepository {
	add: (data: ClassToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<ClassEntity>>
	listenToOne: (id: string, listener: Listeners<ClassEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<ClassEntity>, matches: (entity: ClassEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<ClassEntity | null>
	update: (id: string, data: ClassToModel) => Promise<void>
	delete: (id: string) => Promise<void>
	requestClass: (id: string, request: boolean) => Promise<void>
	leaveClass: (id: string) => Promise<void>
	acceptRequest: (id: string, userId: string, accept: boolean) => Promise<void>
	addMembers: (id: string, userIds: string[], add: boolean) => Promise<void>
	changeMemberRole: (id: string, userId: string, role: ClassUsers, add: boolean) => Promise<void>
}
