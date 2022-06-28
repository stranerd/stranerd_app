import { AnnouncementApiDataSource } from './data/datasources/announcement-api'
import { ClassApiDataSource } from './data/datasources/class-api'
import { GroupApiDataSource } from './data/datasources/group-api'
import { DiscussionApiDataSource } from './data/datasources/discussion-api'
import { EventApiDataSource } from './data/datasources/event-api'
import { SchemeApiDataSource } from './data/datasources/scheme-api'
import { AnnouncementTransformer } from './data/transformers/announcement'
import { ClassTransformer } from './data/transformers/class'
import { GroupTransformer } from './data/transformers/group'
import { DiscussionTransformer } from './data/transformers/discussion'
import { EventTransformer } from './data/transformers/event'
import { SchemeTransformer } from './data/transformers/scheme'
import { AnnouncementRepository } from './data/repositories/announcement'
import { ClassRepository } from './data/repositories/class'
import { GroupRepository } from './data/repositories/group'
import { DiscussionRepository } from './data/repositories/discussion'
import { EventRepository } from './data/repositories/event'
import { SchemeRepository } from './data/repositories/scheme'
import { AnnouncementsUseCase } from './domain/usecases/announcements'
import { ClassesUseCase } from './domain/usecases/classes'
import { GroupsUseCase } from './domain/usecases/groups'
import { DiscussionsUseCase } from './domain/usecases/discussions'
import { EventsUseCase } from './domain/usecases/events'
import { SchemesUseCase } from './domain/usecases/schemes'
import { AnnouncementEntity } from './domain/entities/announcement'
import { ClassEntity } from './domain/entities/class'
import { GroupEntity } from './domain/entities/group'
import { DiscussionEntity } from './domain/entities/discussion'
import { EventEntity } from './domain/entities/event'
import { SchemeEntity } from './domain/entities/scheme'
import { AnnouncementFactory } from './domain/factories/announcement'
import { ClassFactory } from './domain/factories/class'
import { GroupFactory } from './domain/factories/group'
import { DiscussionFactory } from './domain/factories/discussion'
import { EventFactory } from './domain/factories/event'
import { SchemeFactory } from './domain/factories/scheme'
import { ClassUsers, EmbeddedGroup, EventType } from './domain/types'

const announcementDataSource = new AnnouncementApiDataSource()
const classDataSource = new ClassApiDataSource()
const groupDataSource = new GroupApiDataSource()
const discussionDataSource = new DiscussionApiDataSource()
const eventDataSource = new EventApiDataSource()
const schemeDataSource = new SchemeApiDataSource()

const announcementTransformer = new AnnouncementTransformer()
const classTransformer = new ClassTransformer()
const groupTransformer = new GroupTransformer()
const discussionTransformer = new DiscussionTransformer()
const eventTransformer = new EventTransformer()
const schemeTransformer = new SchemeTransformer()

const announcementRepository = new AnnouncementRepository(announcementDataSource, announcementTransformer)
const classRepository = new ClassRepository(classDataSource, classTransformer)
const groupRepository = new GroupRepository(groupDataSource, groupTransformer)
const discussionRepository = new DiscussionRepository(discussionDataSource, discussionTransformer)
const eventRepository = new EventRepository(eventDataSource, eventTransformer)
const schemeRepository = new SchemeRepository(schemeDataSource, schemeTransformer)

export const AnnouncementsUseCases = new AnnouncementsUseCase(announcementRepository)
export const ClassesUseCases = new ClassesUseCase(classRepository)
export const GroupsUseCases = new GroupsUseCase(groupRepository)
export const DiscussionsUseCases = new DiscussionsUseCase(discussionRepository)
export const EventsUseCases = new EventsUseCase(eventRepository)
export const SchemesUseCases = new SchemesUseCase(schemeRepository)

export { AnnouncementEntity, AnnouncementFactory }
export { ClassEntity, ClassFactory, ClassUsers }
export { GroupEntity, GroupFactory }
export { DiscussionEntity, DiscussionFactory }
export { EventEntity, EventFactory, EventType }
export { SchemeEntity, SchemeFactory }
export type { EmbeddedGroup }
