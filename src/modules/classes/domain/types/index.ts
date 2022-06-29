export * from './event'

export enum ClassUsers {
	admins = 'admins',
	tutors = 'tutors',
	members = 'members'
}

export type EmbeddedGroup = {
	id: string
	classId: string
	name: string
}
