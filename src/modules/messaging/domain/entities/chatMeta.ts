import { BaseEntity } from '@modules/core'
import { ChatEntity } from './chat'
import { ChatMetaClasses, ChatMetaData, ChatMetaPersonal, ChatType } from '../types'

export class ChatMetaEntity extends BaseEntity {
	readonly id: string
	readonly last: ChatEntity | null
	readonly members: string[]
	readonly data: ChatMetaData
	readonly readAt: Record<string, number>
	readonly createdAt: number
	readonly updatedAt: number

	constructor ({
		             id,
		             members,
		             data,
		             last,
		             readAt,
		             createdAt,
		             updatedAt
	             }: ChatMetaConstructorArgs) {
		super()
		this.id = id
		this.members = members
		this.data = data
		this.last = last
		this.readAt = readAt
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	getTo (userId: string) {
		if (this.data.type === ChatType.classes) return this.data.group.id
		return Object.keys(this.data.users).filter((key) => key !== userId).at(0) ?? ''
	}

	getToLink (userId: string) {
		if (this.data.type === ChatType.classes) return `/messages/classes/${this.data.group.classId}/${this.data.group.id}`
		return `/messages/personal/${this.getTo(userId)}`
	}

	getToName (userId: string) {
		if (this.data.type === ChatType.classes) return this.data.group.name
		return this.data.users[this.getTo(userId)]?.bio.fullName ?? ''
	}

	getToPhoto (userId: string) {
		if (this.data.type === ChatType.classes) return null
		return this.data.users[this.getTo(userId)]?.bio.photo ?? null
	}

	search (search: string) {
		const val = []
		if (this.data.type === ChatType.personal) {
			Object.values(this.data.users).forEach((u) => {
				val.push(u.bio.fullName.toLowerCase().includes(search.toLowerCase()))
			})
		}
		if (this.data.type === ChatType.classes) val.push(this.data.group.name.toLowerCase().includes(search.toLowerCase()))
		if (this.last) val.push(this.last.search(search))
		return val.some((v) => v)
	}

	isPersonal (meta: ChatMetaEntity): meta is Omit<ChatMetaEntity, 'data'> & { data: ChatMetaPersonal } {
		return meta.data.type === ChatType.personal
	}

	isClasses (meta: ChatMetaEntity): meta is Omit<ChatMetaEntity, 'data'> & { data: ChatMetaClasses } {
		return meta.data.type === ChatType.classes
	}

	hasUnRead (userId: string) {
		return (this.last?.createdAt ?? 0) > (this.readAt[userId] ?? 0)
	}
}

type ChatMetaConstructorArgs = {
	id: string
	readAt: Record<string, number>
	last: ChatEntity | null
	members: string[],
	data: ChatMetaData
	createdAt: number
	updatedAt: number
}
