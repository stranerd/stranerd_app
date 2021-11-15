import { HttpClient } from '@modules/core'
import { apiBases, appName } from '@utils/environment'
import { RoleBaseDataSource } from '../datasources/role-base'

export class RoleApiDataSource implements RoleBaseDataSource {
	private authClient: HttpClient

	constructor () {
		this.authClient = new HttpClient(apiBases.AUTH)
	}

	async toggleAdmin (data: { id: string, isAdmin: boolean }) {
		await this.authClient.post<any, boolean>('/user/roles', {
			app: appName,
			role: 'isAdmin',
			userId: data.id,
			value: data.isAdmin
		})
	}

	async toggleTutor (data: { id: string, isTutor: boolean }) {
		await this.authClient.post<any, boolean>('/user/roles', {
			app: appName,
			role: 'isTutor',
			userId: data.id,
			value: data.isTutor
		})
	}
}
