import { UserApiDataSource } from './data/datasources/userApi'
import { NotificationApiDataSource } from './data/datasources/notificationApi'
import { ReferralApiDataSource } from './data/datasources/referralApi'
import { ConnectApiDataSource } from './data/datasources/connectApi'
import { UserTransformer } from './data/transformers/user'
import { NotificationTransformer } from './data/transformers/notification'
import { ReferralTransformer } from './data/transformers/referral'
import { ConnectTransformer } from './data/transformers/connect'
import { UserRepository } from './data/repositories/user'
import { NotificationRepository } from './data/repositories/notification'
import { ReferralRepository } from './data/repositories/referral'
import { ConnectRepository } from './data/repositories/connect'
import { UsersUseCase } from './domain/usecases/users'
import { NotificationsUseCase } from './domain/usecases/notifications'
import { ReferralsUseCase } from './domain/usecases/referrals'
import { ConnectsUseCase } from './domain/usecases/connects'
import { generateDefaultBio, generateDefaultRoles, generateEmbeddedUser, UserEntity } from './domain/entities/user'
import { NotificationEntity } from './domain/entities/notification'
import { ReferralEntity } from './domain/entities/referral'
import { ConnectEntity } from './domain/entities/connect'
import {
	EmbeddedUser,
	NotificationData,
	NotificationType,
	RankingTimes,
	UserBio,
	UserRoles,
	UserSchoolType
} from './domain/types'

const userDataSource = new UserApiDataSource()
const notificationDataSource = new NotificationApiDataSource()
const referralDataSource = new ReferralApiDataSource()
const connectDataSource = new ConnectApiDataSource()

const userTransformer = new UserTransformer()
const notificationTransformer = new NotificationTransformer()
const referralTransformer = new ReferralTransformer()
const connectTransformer = new ConnectTransformer()

const userRepository = new UserRepository(userDataSource, userTransformer)
const notificationRepository = new NotificationRepository(notificationDataSource, notificationTransformer)
const referralRepository = new ReferralRepository(referralDataSource, referralTransformer)
const connectRepository = new ConnectRepository(connectDataSource, connectTransformer)

export const UsersUseCases = new UsersUseCase(userRepository)
export const NotificationsUseCases = new NotificationsUseCase(notificationRepository)
export const ReferralsUseCases = new ReferralsUseCase(referralRepository)
export const ConnectsUseCases = new ConnectsUseCase(connectRepository)

export {
	UserEntity,
	RankingTimes,
	generateDefaultBio,
	generateDefaultRoles,
	generateEmbeddedUser,
	NotificationEntity,
	ReferralEntity,
	ConnectEntity
}
export type { UserBio, UserRoles, EmbeddedUser, NotificationData }
export { UserSchoolType, NotificationType }
