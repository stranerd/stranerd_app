import { UserBio } from '@modules/users'
import { Media } from '@modules/core'

export type AuthUser = {
	email: string
	password: string
}

export type NewUser = {
	firstName: string
	lastName: string
	email: string
	password: string
	description: string
	photo: Media | null
}

export type ProfileUpdate = Omit<UserBio, 'fullName' | 'email' | 'phone'>

export type PasswordUpdate = {
	oldPassword: string
	password: string
}

export enum AuthTypes {
	google = 'google',
	email = 'email',
	facebook = 'facebook',
	twitter = 'twitter'
}

export type AfterAuthUser = {
	accessToken: string
	refreshToken: string
	user: AuthDetails
}

export type AuthDetails = {
	id: string
	firstName: string
	lastName: string
	fullName: string
	email: string
	isVerified: boolean
	roles: Record<string, Record<string, boolean>>
	authTypes: AuthTypes[]
	photo: Media | null
	phone: Phone | null
}

export type AuthExtras = {
	referrer?: string
}

export type Phone = {
	code: string,
	number: string
}
