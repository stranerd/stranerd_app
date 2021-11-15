import { AuthApiDataSource } from './data/datasources/auth-api'
import { AuthRepository } from './data/repositories/auth'
import { SigninWithGoogleUseCase } from './domain/usecases/auth/signinWithGoogle'
import { SessionSigninUseCase } from './domain/usecases/auth/sessionSignin'
import { SessionSignoutUseCase } from './domain/usecases/auth/sessionSignout'
import { UpdateProfileUseCase } from './domain/usecases/auth/updateProfile'
import { UpdatePasswordUseCase } from './domain/usecases/auth/updatePassword'
import { SigninWithEmailUseCase } from './domain/usecases/auth/signinWithEmail'
import { SignupWithEmailUseCase } from './domain/usecases/auth/signupWithEmail'
import { SendVerificationEmailUseCase } from './domain/usecases/auth/sendVerificationEmail'
import { SendPasswordResetEmailUseCase } from './domain/usecases/auth/sendPasswordResetMail'
import { ResetPasswordUseCase } from './domain/usecases/auth/resetPassword'
import { CompleteEmailVerificationUseCase } from './domain/usecases/auth/completeEmailVerification'
import { GetAuthUserUseCase } from './domain/usecases/auth/getAuthUser'

export { EmailSigninFactory } from './domain/factories/emailSignin'
export { EmailSignupFactory } from './domain/factories/emailSignup'
export { PasswordResetRequestFactory } from './domain/factories/passwordResetRequest'
export { PasswordResetFactory } from './domain/factories/passwordReset'
export { ProfileUpdateFactory } from './domain/factories/profileUpdate'
export { PasswordUpdateFactory } from './domain/factories/passwordUpdate'

const authDataSource = new AuthApiDataSource()

const authRepository = new AuthRepository(authDataSource)

export const GetAuthUser = new GetAuthUserUseCase(authRepository)
export const SigninWithGoogle = new SigninWithGoogleUseCase(authRepository)
export const SigninWithEmail = new SigninWithEmailUseCase(authRepository)
export const SignupWithEmail = new SignupWithEmailUseCase(authRepository)
export const SendVerificationEmail = new SendVerificationEmailUseCase(authRepository)
export const CompleteEmailVerification = new CompleteEmailVerificationUseCase(authRepository)
export const SendPasswordResetEmail = new SendPasswordResetEmailUseCase(authRepository)
export const ResetPassword = new ResetPasswordUseCase(authRepository)
export const UpdateProfile = new UpdateProfileUseCase(authRepository)
export const UpdatePassword = new UpdatePasswordUseCase(authRepository)
export const SessionSignin = new SessionSigninUseCase(authRepository)
export const SessionSignout = new SessionSignoutUseCase(authRepository)
