import { AnnouncementApiDataSource } from './data/datasources/announcement-api'
import { ClassApiDataSource } from './data/datasources/class-api'
import { GroupApiDataSource } from './data/datasources/group-api'
import { DiscussionApiDataSource } from './data/datasources/discussion-api'
import { AnnouncementTransformer } from './data/transformers/announcement'
import { ClassTransformer } from './data/transformers/class'
import { GroupTransformer } from './data/transformers/group'
import { DiscussionTransformer } from './data/transformers/discussion'
import { AnnouncementRepository } from './data/repositories/announcement'
import { ClassRepository } from './data/repositories/class'
import { GroupRepository } from './data/repositories/group'
import { DiscussionRepository } from './data/repositories/discussion'
import { AnnouncementsUseCase } from './domain/usecases/announcements'
import { ClassesUseCase } from './domain/usecases/classes'
import { GroupsUseCase } from './domain/usecases/groups'
import { DiscussionsUseCase } from './domain/usecases/discussions'
import { AnnouncementEntity } from './domain/entities/announcement'
import { ClassEntity, ClassUsers } from './domain/entities/class'
import { GroupEntity } from './domain/entities/group'
import { DiscussionEntity } from './domain/entities/discussion'
import { AnnouncementFactory } from './domain/factories/announcement'
import { ClassFactory } from './domain/factories/class'
import { GroupFactory } from './domain/factories/group'
import { DiscussionFactory } from './domain/factories/discussion'

const announcementDataSource = new AnnouncementApiDataSource()
const classDataSource = new ClassApiDataSource()
const groupDataSource = new GroupApiDataSource()
const discussionDataSource = new DiscussionApiDataSource()

const announcementTransformer = new AnnouncementTransformer()
const classTransformer = new ClassTransformer()
const groupTransformer = new GroupTransformer()
const discussionTransformer = new DiscussionTransformer()

const announcementRepository = new AnnouncementRepository(announcementDataSource, announcementTransformer)
const classRepository = new ClassRepository(classDataSource, classTransformer)
const groupRepository = new GroupRepository(groupDataSource, groupTransformer)
const discussionRepository = new DiscussionRepository(discussionDataSource, discussionTransformer)

export const AnnouncementsUseCases = new AnnouncementsUseCase(announcementRepository)
export const ClassesUseCases = new ClassesUseCase(classRepository)
export const GroupsUseCases = new GroupsUseCase(groupRepository)
export const DiscussionsUseCases = new DiscussionsUseCase(discussionRepository)

export { AnnouncementEntity, AnnouncementFactory }
export { ClassEntity, ClassFactory, ClassUsers }
export { GroupEntity, GroupFactory }
export { DiscussionEntity, DiscussionFactory }
