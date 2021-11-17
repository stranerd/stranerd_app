import { UserApiDataSource } from './data/datasources/user-api'
import { RoleApiDataSource } from './data/datasources/role-api'
import { NotificationApiDataSource } from './data/datasources/notification-api'
import { ReviewApiDataSource } from './data/datasources/review-api'
import { ReferralApiDataSource } from './data/datasources/referral-api'
import { UserTransformer } from './data/transformers/user'
import { NotificationTransformer } from './data/transformers/notification'
import { ReviewTransformer } from './data/transformers/review'
import { ReferralTransformer } from './data/transformers/referral'
import { UserRepository } from './data/repositories/user'
import { RoleRepository } from './data/repositories/role'
import { NotificationRepository } from './data/repositories/notification'
import { ReviewRepository } from './data/repositories/review'
import { ReferralRepository } from './data/repositories/referral'
import { FindUserUseCase } from './domain/usecases/users/findUser'
import { MakeAdminUseCase } from './domain/usecases/roles/makeAdmin'
import { RemoveAdminUseCase } from './domain/usecases/roles/removeAdmin'
import { MakeTutorUseCase } from './domain/usecases/roles/makeTutor'
import { RemoveTutorUseCase } from './domain/usecases/roles/removeTutor'
import { GetUsersByEmailUseCase } from './domain/usecases/users/getUsersByEmail'
import { GetLeaderboardUseCase } from './domain/usecases/users/getLeaderboard'
import { GetAllAdminsUseCase } from './domain/usecases/users/getAllAdmins'
import { GetAllTutorsUseCase } from './domain/usecases/users/getAllTutors'
import { ListenToAllTutorsUseCase } from './domain/usecases/users/listenToAllTutors'
import { ListenToUserUseCase } from './domain/usecases/users/listenToUser'
import { UpdateStreakUseCase } from './domain/usecases/users/updateStreak'
import { UpdateTutorUseCase } from './domain/usecases/users/updateTutor'
import { GetNotificationsUseCase } from './domain/usecases/notifications/getNotifications'
import { ListenToNotificationsUseCase } from './domain/usecases/notifications/listenToNotifications'
import { MarkNotificationSeenUseCase } from './domain/usecases/notifications/markNotificationSeen'
import { GetReviewsUseCase } from './domain/usecases/reviews/getReviews'
import { ListenToReviewsUseCase } from './domain/usecases/reviews/listenToReviews'
import { CreateReviewUseCase } from './domain/usecases/reviews/createReview'
import { GetReferralsUseCase } from './domain/usecases/referrals/getReferrals'
import { ListenToReferralsUseCase } from './domain/usecases/referrals/listenToReferrals'
import { generateDefaultBio, RankingTimes, UserBio, UserEntity } from './domain/entities/user'
import { NotificationEntity } from './domain/entities/notification'
import { ReviewEntity } from './domain/entities/review'
import { ReferralEntity } from './domain/entities/referral'

export { TutorUpdateFactory } from '../users/domain/factories/tutorUpdate'

const userDataSource = new UserApiDataSource()
const roleDataSource = new RoleApiDataSource()
const notificationDataSource = new NotificationApiDataSource()
const reviewDataSource = new ReviewApiDataSource()
const referralDataSource = new ReferralApiDataSource()

const userTransformer = new UserTransformer()
const notificationTransformer = new NotificationTransformer()
const reviewTransformer = new ReviewTransformer()
const referralTransformer = new ReferralTransformer()

const userRepository = new UserRepository(userDataSource, userTransformer)
const roleRepository = new RoleRepository(roleDataSource)
const notificationRepository = new NotificationRepository(notificationDataSource, notificationTransformer)
const reviewRepository = new ReviewRepository(reviewDataSource, reviewTransformer)
const referralRepository = new ReferralRepository(referralDataSource, referralTransformer)

export const FindUser = new FindUserUseCase(userRepository)
export const GetUsersByEmail = new GetUsersByEmailUseCase(userRepository)
export const GetLeaderboard = new GetLeaderboardUseCase(userRepository)
export const GetAllAdmins = new GetAllAdminsUseCase(userRepository)
export const GetAllTutors = new GetAllTutorsUseCase(userRepository)
export const ListenToAllTutors = new ListenToAllTutorsUseCase(userRepository)
export const ListenToUser = new ListenToUserUseCase(userRepository)
export const UpdateStreak = new UpdateStreakUseCase(userRepository)
export const UpdateTutor = new UpdateTutorUseCase(userRepository)

export const MakeAdmin = new MakeAdminUseCase(roleRepository)
export const MakeTutor = new MakeTutorUseCase(roleRepository)
export const RemoveAdmin = new RemoveAdminUseCase(roleRepository)
export const RemoveTutor = new RemoveTutorUseCase(roleRepository)

export const GetNotifications = new GetNotificationsUseCase(notificationRepository)
export const ListenToNotifications = new ListenToNotificationsUseCase(notificationRepository)
export const MarkNotificationSeen = new MarkNotificationSeenUseCase(notificationRepository)

export const CreateReview = new CreateReviewUseCase(reviewRepository)
export const GetReviews = new GetReviewsUseCase(reviewRepository)
export const ListenToReviews = new ListenToReviewsUseCase(reviewRepository)

export const GetReferrals = new GetReferralsUseCase(referralRepository)
export const ListenToReferrals = new ListenToReferralsUseCase(referralRepository)

export {
	UserEntity,
	RankingTimes,
	generateDefaultBio,
	NotificationEntity,
	ReviewEntity,
	ReferralEntity
}
export type { UserBio }
