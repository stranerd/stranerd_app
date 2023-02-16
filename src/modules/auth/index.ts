import { AuthApiDataSource } from './data/datasources/authApi'
import { AuthRepository } from './data/repositories/auth'
import { AuthUseCase } from './domain/usecases/auth'

export type { Phone } from './domain/entities/auth'
export { EmailSigninFactory } from './domain/factories/emailSignin'
export { EmailSignupFactory } from './domain/factories/emailSignup'
export { PasswordResetFactory } from './domain/factories/passwordReset'
export { PasswordUpdateFactory } from './domain/factories/passwordUpdate'
export { isValidPhone, PhoneUpdateFactory } from './domain/factories/phoneUpdate'
export { ProfileUpdateFactory } from './domain/factories/profileUpdate'

const authDataSource = new AuthApiDataSource()

const authRepository = new AuthRepository(authDataSource)

export const AuthUseCases = new AuthUseCase(authRepository)
