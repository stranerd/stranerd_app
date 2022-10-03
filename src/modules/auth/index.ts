import { AuthApiDataSource } from './data/datasources/authApi'
import { AuthRepository } from './data/repositories/auth'
import { AuthUseCase } from './domain/usecases/auth'

export { EmailSigninFactory } from './domain/factories/emailSignin'
export { EmailSignupFactory } from './domain/factories/emailSignup'
export { PasswordResetFactory } from './domain/factories/passwordReset'
export { ProfileUpdateFactory } from './domain/factories/profileUpdate'
export { PasswordUpdateFactory } from './domain/factories/passwordUpdate'

const authDataSource = new AuthApiDataSource()

const authRepository = new AuthRepository(authDataSource)

export const AuthUseCases = new AuthUseCase(authRepository)
