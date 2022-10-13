import { closeSocket, HttpClient } from '@modules/core'
import { apiBase } from '@utils/environment'
import { deleteTokens, saveTokens } from '@utils/tokens'
import {
	AfterAuthUser,
	AuthDetails,
	AuthExtras,
	NewUser,
	PasswordUpdate,
	ProfileUpdate
} from '../../domain/entities/auth'
import { AuthBaseDataSource } from './authBase'

export class AuthApiDataSource implements AuthBaseDataSource {
	private authClient: HttpClient

	constructor () {
		this.authClient = new HttpClient(apiBase + '/auth')
	}

	async getAuthUser () {
		return await this.authClient.get<any, AuthDetails | null>('/user', {})
	}

	async signinWithEmail (email: string, password: string, extras: AuthExtras) {
		return await this.authClient.post<any, AfterAuthUser>('/emails/signin', {
			email, password,
			referrer: extras.referrer
		})
	}

	async signinWithGoogle (data: { accessToken: string, idToken: string }, extras: AuthExtras) {
		return await this.authClient.post<any, AfterAuthUser>('/identities/google', {
			...data, referrer: extras.referrer
		})
	}

	async signinWithApple (data: { firstName: string | null, lastName: string | null, email: string | null, idToken: string }, extras: AuthExtras) {
		return await this.authClient.post<any, AfterAuthUser>('/identities/apple', {
			...data, referrer: extras.referrer
		})
	}

	async signupWithEmail (user: NewUser, extras: AuthExtras) {
		return await this.authClient.post<any, AfterAuthUser>('/emails/signup', {
			...user,
			referrer: extras.referrer
		})
	}

	async sendVerificationEmail (email: string) {
		await this.authClient.post<any, boolean>('/emails/verify/mail', { email })
	}

	async completeEmailVerification (token: string) {
		return await this.authClient.post<any, AfterAuthUser>('/emails/verify', {
			token
		})
	}

	async sendPasswordResetEmail (email: string) {
		await this.authClient.post<any, boolean>('/passwords/reset/mail', { email })
	}

	async resetPassword (token: string, password: string) {
		return await this.authClient.post<any, AfterAuthUser>('/passwords/reset', {
			token, password
		})
	}

	async updateProfile (bio: ProfileUpdate) {
		await this.authClient.put<ProfileUpdate, any>('/user', bio)
	}

	async updatePassword (passwords: PasswordUpdate) {
		await this.authClient.post<PasswordUpdate, any>('/passwords/update', passwords)
	}

	async session (afterAuth: AfterAuthUser) {
		await saveTokens(afterAuth)
		await closeSocket()
		return afterAuth.user
	}

	async signout () {
		await this.authClient.post<any, boolean>('/user/signout', {}).catch()
		await deleteTokens()
		await closeSocket()
	}

	async updateRole (data: { id: string, value: boolean, role: string }) {
		return await this.authClient.post<any, boolean>('/user/roles', {
			role: data.role,
			userId: data.id,
			value: data.value
		})
	}
}
