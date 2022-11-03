import { AnnouncementApiDataSource } from './data/datasources/announcementApi'
import { ClassApiDataSource } from './data/datasources/classApi'
import { GroupApiDataSource } from './data/datasources/groupApi'
import { EventApiDataSource } from './data/datasources/eventApi'
import { SchemeApiDataSource } from './data/datasources/schemeApi'
import { AnnouncementTransformer } from './data/transformers/announcement'
import { ClassTransformer } from './data/transformers/class'
import { GroupTransformer } from './data/transformers/group'
import { EventTransformer } from './data/transformers/event'
import { SchemeTransformer } from './data/transformers/scheme'
import { AnnouncementRepository } from './data/repositories/announcement'
import { ClassRepository } from './data/repositories/class'
import { GroupRepository } from './data/repositories/group'
import { EventRepository } from './data/repositories/event'
import { SchemeRepository } from './data/repositories/scheme'
import { AnnouncementsUseCase } from './domain/usecases/announcements'
import { ClassesUseCase } from './domain/usecases/classes'
import { GroupsUseCase } from './domain/usecases/groups'
import { EventsUseCase } from './domain/usecases/events'
import { SchemesUseCase } from './domain/usecases/schemes'
import { AnnouncementEntity } from './domain/entities/announcement'
import { ClassEntity } from './domain/entities/class'
import { GroupEntity } from './domain/entities/group'
import { EventEntity } from './domain/entities/event'
import { SchemeEntity } from './domain/entities/scheme'
import { AnnouncementFactory } from './domain/factories/announcement'
import { ClassFactory } from './domain/factories/class'
import { GroupFactory } from './domain/factories/group'
import { EventFactory } from './domain/factories/event'
import { SchemeFactory } from './domain/factories/scheme'
import { ClassUsers, EmbeddedGroup, EventType } from './domain/types'

const announcementDataSource = new AnnouncementApiDataSource()
const classDataSource = new ClassApiDataSource()
const groupDataSource = new GroupApiDataSource()
const eventDataSource = new EventApiDataSource()
const schemeDataSource = new SchemeApiDataSource()

const announcementTransformer = new AnnouncementTransformer()
const classTransformer = new ClassTransformer()
const groupTransformer = new GroupTransformer()
const eventTransformer = new EventTransformer()
const schemeTransformer = new SchemeTransformer()

const announcementRepository = new AnnouncementRepository(announcementDataSource, announcementTransformer)
const classRepository = new ClassRepository(classDataSource, classTransformer)
const groupRepository = new GroupRepository(groupDataSource, groupTransformer)
const eventRepository = new EventRepository(eventDataSource, eventTransformer)
const schemeRepository = new SchemeRepository(schemeDataSource, schemeTransformer)

export const AnnouncementsUseCases = new AnnouncementsUseCase(announcementRepository)
export const ClassesUseCases = new ClassesUseCase(classRepository)
export const GroupsUseCases = new GroupsUseCase(groupRepository)
export const EventsUseCases = new EventsUseCase(eventRepository)
export const SchemesUseCases = new SchemesUseCase(schemeRepository)

export { AnnouncementEntity, AnnouncementFactory }
export { ClassEntity, ClassFactory, ClassUsers }
export { GroupEntity, GroupFactory }
export { EventEntity, EventFactory, EventType }
export { SchemeEntity, SchemeFactory }
export type { EmbeddedGroup }
