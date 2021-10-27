export interface IRoleRepository {
	toggleAdmin: (id: string, isAdmin: boolean) => Promise<void>
	toggleTutor: (id: string, isTutor: boolean) => Promise<void>
}
