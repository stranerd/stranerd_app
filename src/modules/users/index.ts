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
import { FindUserUseCase } from './domain/usecases/users/findUser'
import { SearchUsersUseCase } from './domain/usecases/users/searchUsers'
import { GetLeaderboardUseCase } from './domain/usecases/users/getLeaderboard'
import { GetAllAdminsUseCase } from './domain/usecases/users/getAllAdmins'
import { GetAllTutorsUseCase } from './domain/usecases/users/getAllTutors'
import { GetUsersInListUseCase } from './domain/usecases/users/getUsersInList'
import { ListenToAllTutorsUseCase } from './domain/usecases/users/listenToAllTutors'
import { ListenToAllAdminsUseCase } from './domain/usecases/users/listenToAllAdmins'
import { ListenToUsersInListUseCase } from './domain/usecases/users/listenToUsersInList'
import { ListenToUserUseCase } from './domain/usecases/users/listenToUser'
import { UpdateSchoolUseCase } from './domain/usecases/users/updateSchool'
import { GetNotificationsUseCase } from './domain/usecases/notifications/getNotifications'
import { ListenToNotificationsUseCase } from './domain/usecases/notifications/listenToNotifications'
import { MarkNotificationSeenUseCase } from './domain/usecases/notifications/markNotificationSeen'
import { GetReviewsUseCase } from './domain/usecases/reviews/getReviews'
import { ListenToReviewsUseCase } from './domain/usecases/reviews/listenToReviews'
import { CreateReviewUseCase } from './domain/usecases/reviews/createReview'
import { GetReferralsUseCase } from './domain/usecases/referrals/getReferrals'
import { ListenToReferralsUseCase } from './domain/usecases/referrals/listenToReferrals'
import { GetBadgeUseCase } from './domain/usecases/badges/getBadge'
import { ListenToBadgeUseCase } from './domain/usecases/badges/listenToBadge'
import { generateDefaultBio, generateDefaultRoles, UserEntity } from './domain/entities/user'
import { NotificationEntity } from './domain/entities/notification'
import { ReviewEntity } from './domain/entities/review'
import { ReferralEntity } from './domain/entities/referral'
import { BadgeEntity } from './domain/entities/badge'
import { RankingTimes, UserBio, UserRoles, UserSchoolType } from './domain/types'

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

export const FindUser = new FindUserUseCase(userRepository)
export const SearchUsers = new SearchUsersUseCase(userRepository)
export const GetLeaderboard = new GetLeaderboardUseCase(userRepository)
export const GetAllAdmins = new GetAllAdminsUseCase(userRepository)
export const GetAllTutors = new GetAllTutorsUseCase(userRepository)
export const GetUsersInList = new GetUsersInListUseCase(userRepository)
export const ListenToAllTutors = new ListenToAllTutorsUseCase(userRepository)
export const ListenToAllAdmins = new ListenToAllAdminsUseCase(userRepository)
export const ListenToUsersInList = new ListenToUsersInListUseCase(userRepository)
export const ListenToUser = new ListenToUserUseCase(userRepository)
export const UpdateUserSchool = new UpdateSchoolUseCase(userRepository)

export const GetNotifications = new GetNotificationsUseCase(notificationRepository)
export const ListenToNotifications = new ListenToNotificationsUseCase(notificationRepository)
export const MarkNotificationSeen = new MarkNotificationSeenUseCase(notificationRepository)

export const CreateReview = new CreateReviewUseCase(reviewRepository)
export const GetReviews = new GetReviewsUseCase(reviewRepository)
export const ListenToReviews = new ListenToReviewsUseCase(reviewRepository)

export const GetReferrals = new GetReferralsUseCase(referralRepository)
export const ListenToReferrals = new ListenToReferralsUseCase(referralRepository)

export const GetBadge = new GetBadgeUseCase(badgeRepository)
export const ListenToBadge = new ListenToBadgeUseCase(badgeRepository)

export {
	UserEntity,
	RankingTimes,
	generateDefaultBio,
	generateDefaultRoles,
	NotificationEntity,
	ReviewEntity,
	ReferralEntity,
	BadgeEntity
}
export type { UserBio, UserRoles }
export { UserSchoolType }
