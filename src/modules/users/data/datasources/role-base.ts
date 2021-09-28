export interface RoleBaseDataSource {
	toggleAdmin: (data: { id: string; isAdmin: boolean }) => Promise<void>;
}
