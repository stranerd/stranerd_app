import { AfterAuthUser, AuthDetails, AuthExtras, NewUser, PasswordUpdate, ProfileUpdate } from '../entities/auth'

export interface IAuthRepository {
	getAuthUser: () => Promise<AuthDetails | null>
	signinWithEmail: (email: string, password: string, extras: AuthExtras) => Promise<AfterAuthUser>
	signinWithGoogle: (idToken: string, extras: AuthExtras) => Promise<AfterAuthUser>
	signupWithEmail: (data: NewUser, extras: AuthExtras) => Promise<AfterAuthUser>
	sendVerificationEmail: (email: string) => Promise<void>
	completeEmailVerification: (token: string) => Promise<AfterAuthUser>
	sendPasswordResetEmail: (email: string) => Promise<void>
	resetPassword: (token: string, password: string) => Promise<AfterAuthUser>
	updateProfile: (profile: ProfileUpdate) => Promise<void>
	updatePassword: (password: PasswordUpdate) => Promise<void>
	session: (afterAuth: AfterAuthUser) => Promise<AuthDetails>
	signout: () => Promise<void>
	updateRole: (data: { id: string, value: boolean, role: string }) => Promise<boolean>
}
