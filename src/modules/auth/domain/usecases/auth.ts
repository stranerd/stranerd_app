import { IAuthRepository } from '../irepositories/iauth'
import { PasswordResetFactory } from '../factories/passwordReset'
import { AfterAuthUser, AuthExtras } from '../entities/auth'
import { EmailSigninFactory } from '../factories/emailSignin'
import { EmailSignupFactory } from '../factories/emailSignup'
import { PasswordUpdateFactory } from '../factories/passwordUpdate'
import { ProfileUpdateFactory } from '../factories/profileUpdate'
import { UserRoles } from '@modules/users'

export class AuthUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async completeEmailVerification (token: string) {
		return await this.repository.completeEmailVerification(token)
	}

	async getAuthUser () {
		return await this.repository.getAuthUser()
	}

	async resetPassword (factory: PasswordResetFactory) {
		const { token, password } = await factory.toModel()
		return await this.repository.resetPassword(token, password)
	}

	async sendPasswordResetEmail (email: string) {
		return await this.repository.sendPasswordResetEmail(email)
	}

	async sendVerificationEmail (email: string) {
		return await this.repository.sendVerificationEmail(email)
	}

	async sessionSignin (afterAuth: AfterAuthUser) {
		return await this.repository.session(afterAuth)
	}

	async sessionSignout () {
		return await this.repository.signout()
	}

	async deleteAccount () {
		return await this.repository.deleteAccount()
	}

	async signinWithGoogle (data: { idToken: string }, extras: AuthExtras) {
		return await this.repository.signinWithGoogle(data, extras)
	}

	async signinWithApple (data: { firstName: string | null, lastName: string | null, email: string | null, idToken: string }, extras: AuthExtras) {
		return await this.repository.signinWithApple(data, extras)
	}

	async signinWithEmail (factory: EmailSigninFactory, extras: AuthExtras) {
		const { email, password } = await factory.toModel()
		return await this.repository.signinWithEmail(email, password, extras)
	}

	async signupWithEmail (factory: EmailSignupFactory, extras: AuthExtras) {
		return await this.repository.signupWithEmail(await factory.toModel(), extras)
	}

	async updatePassword (factory: PasswordUpdateFactory) {
		return await this.repository.updatePassword(await factory.toModel())
	}

	async updateProfile (factory: ProfileUpdateFactory) {
		return await this.repository.updateProfile(await factory.toModel())
	}

	async updateRole (id: string, role: keyof UserRoles, value: boolean) {
		return await this.repository.updateRole({ id, value, role })
	}
}
