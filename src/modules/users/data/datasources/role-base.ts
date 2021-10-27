export interface RoleBaseDataSource {
	toggleAdmin: (data: { id: string, isAdmin: boolean }) => Promise<void>
	toggleTutor: (data: { id: string, isTutor: boolean }) => Promise<void>
}
