export interface IRoleRepository {
	toggleAdmin: (id: string, isAdmin: boolean) => Promise<void>;
}
