import { AuthBaseDataSource } from '../datasources/authBase'
import { IAuthRepository } from '../../domain/irepositories/iauth'
import { AfterAuthUser, AuthExtras, NewUser, PasswordUpdate, ProfileUpdate } from '../../domain/entities/auth'

export class AuthRepository implements IAuthRepository {
	private dataSource: AuthBaseDataSource

	constructor (dataSource: AuthBaseDataSource) {
		this.dataSource = dataSource
	}

	async getAuthUser () {
		return await this.dataSource.getAuthUser()
	}

	async signinWithEmail (email: string, password: string, extras: AuthExtras) {
		return await this.dataSource.signinWithEmail(email, password, extras)
	}

	async signinWithGoogle (data: { idToken: string }, extras: AuthExtras) {
		return await this.dataSource.signinWithGoogle(data, extras)
	}

	async signinWithApple (data: { firstName: string | null, lastName: string | null, email: string | null, idToken: string }, extras: AuthExtras) {
		return await this.dataSource.signinWithApple(data, extras)
	}

	async signupWithEmail (data: NewUser, extras: AuthExtras) {
		return await this.dataSource.signupWithEmail(data, extras)
	}

	async sendVerificationEmail (email: string) {
		return await this.dataSource.sendVerificationEmail(email)
	}

	async completeEmailVerification (token: string) {
		return await this.dataSource.completeEmailVerification(token)
	}

	async sendPasswordResetEmail (email: string) {
		return await this.dataSource.sendPasswordResetEmail(email)
	}

	async resetPassword (token: string, password: string) {
		return await this.dataSource.resetPassword(token, password)
	}

	async updateProfile (profile: ProfileUpdate) {
		return await this.dataSource.updateProfile(profile)
	}

	async updatePassword (password: PasswordUpdate) {
		return await this.dataSource.updatePassword(password)
	}

	async session (afterAuth: AfterAuthUser) {
		return await this.dataSource.session(afterAuth)
	}

	async signout () {
		return await this.dataSource.signout()
	}

	async deleteAccount () {
		return await this.dataSource.deleteAccount()
	}

	async updateRole (data: { id: string, value: boolean, role: string }) {
		return await this.dataSource.updateRole(data)
	}
}
