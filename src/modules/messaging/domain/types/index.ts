import { EmbeddedUser } from '@modules/users'
import { EmbeddedGroup } from '@modules/classes'

export enum ChatType {
	personal = 'personal',
	classes = 'classes'
}

export type ChatMetaPersonal = {
	type: ChatType.personal
	users: Record<string, EmbeddedUser>
}

export type ChatMetaClasses = {
	type: ChatType.classes
	group: EmbeddedGroup
}

export type ChatMetaData = ChatMetaPersonal | ChatMetaClasses

export type ChatPersonal = {
	type: ChatType.personal
	members: string[]
}

export type ChatClasses = {
	type: ChatType.classes
	members: string[]
	classId: string
}

export type ChatData = ChatPersonal | ChatClasses
