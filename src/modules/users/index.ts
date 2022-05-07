import { UserApiDataSource } from './data/datasources/user-api'
import { NotificationApiDataSource } from './data/datasources/notification-api'
import { ReviewApiDataSource } from './data/datasources/review-api'
import { ReferralApiDataSource } from './data/datasources/referral-api'
import { BadgeApiDataSource } from './data/datasources/badge-api'
import { UserTransformer } from './data/transformers/user'
import { NotificationTransformer } from './data/transformers/notification'
import { ReviewTransformer } from './data/transformers/review'
import { ReferralTransformer } from './data/transformers/referral'
import { BadgeTransformer } from './data/transformers/badge'
import { UserRepository } from './data/repositories/user'
import { NotificationRepository } from './data/repositories/notification'
import { ReviewRepository } from './data/repositories/review'
import { ReferralRepository } from './data/repositories/referral'
import { BadgeRepository } from './data/repositories/badge'
import { UsersUseCase } from './domain/usecases/users'
import { NotificationsUseCase } from './domain/usecases/notifications'
import { ReviewsUseCase } from './domain/usecases/reviews'
import { ReferralsUseCase } from './domain/usecases/referrals'
import { BadgesUseCase } from './domain/usecases/badges'
import { generateDefaultBio, generateDefaultRoles, generateEmbeddedUser, UserEntity } from './domain/entities/user'
import { NotificationEntity } from './domain/entities/notification'
import { ReviewEntity } from './domain/entities/review'
import { ReferralEntity } from './domain/entities/referral'
import { BadgeEntity } from './domain/entities/badge'
import { EmbeddedUser, RankingTimes, UserBio, UserRoles, UserSchoolType } from './domain/types'

const userDataSource = new UserApiDataSource()
const notificationDataSource = new NotificationApiDataSource()
const reviewDataSource = new ReviewApiDataSource()
const referralDataSource = new ReferralApiDataSource()
const badgeDataSource = new BadgeApiDataSource()

const userTransformer = new UserTransformer()
const notificationTransformer = new NotificationTransformer()
const reviewTransformer = new ReviewTransformer()
const referralTransformer = new ReferralTransformer()
const badgeTransformer = new BadgeTransformer()

const userRepository = new UserRepository(userDataSource, userTransformer)
const notificationRepository = new NotificationRepository(notificationDataSource, notificationTransformer)
const reviewRepository = new ReviewRepository(reviewDataSource, reviewTransformer)
const referralRepository = new ReferralRepository(referralDataSource, referralTransformer)
const badgeRepository = new BadgeRepository(badgeDataSource, badgeTransformer)

export const UsersUseCases = new UsersUseCase(userRepository)
export const NotificationsUseCases = new NotificationsUseCase(notificationRepository)
export const ReviewsUseCases = new ReviewsUseCase(reviewRepository)
export const ReferralsUseCases = new ReferralsUseCase(referralRepository)
export const BadgesUseCases = new BadgesUseCase(badgeRepository)

export {
	UserEntity,
	RankingTimes,
	generateDefaultBio,
	generateDefaultRoles,
	generateEmbeddedUser,
	NotificationEntity,
	ReviewEntity,
	ReferralEntity,
	BadgeEntity
}
export type { UserBio, UserRoles, EmbeddedUser }
export { UserSchoolType }
