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
import { AddAnnouncementUseCase } from './domain/usecases/announcements/addAnnouncement'
import { GetAnnouncementsUseCase } from './domain/usecases/announcements/getAnnouncements'
import { FindAnnouncementUseCase } from './domain/usecases/announcements/findAnnouncement'
import { ListenToAnnouncementUseCase } from './domain/usecases/announcements/listenToAnnouncement'
import { ListenToAnnouncementsUseCase } from './domain/usecases/announcements/listenToAnnouncements'
import { UpdateAnnouncementUseCase } from './domain/usecases/announcements/updateAnnouncement'
import { DeleteAnnouncementUseCase } from './domain/usecases/announcements/deleteAnnouncement'
import { AddClassUseCase } from './domain/usecases/classes/addClass'
import { GetMyClassesUseCase } from './domain/usecases/classes/getMyClasses'
import { FindClassUseCase } from './domain/usecases/classes/findClass'
import { ListenToClassUseCase } from './domain/usecases/classes/listenToClass'
import { ListenToMyClassesUseCase } from './domain/usecases/classes/listenToMyClasses'
import { UpdateClassUseCase } from './domain/usecases/classes/updateClass'
import { DeleteClassUseCase } from './domain/usecases/classes/deleteClass'
import { RequestClassUseCase } from './domain/usecases/classes/requestClass'
import { LeaveClassUseCase } from './domain/usecases/classes/leaveClass'
import { AcceptRequestUseCase } from './domain/usecases/classes/acceptRequest'
import { AddMembersUseCase } from './domain/usecases/classes/addMembers'
import { ChangeMemberRoleUseCase } from './domain/usecases/classes/changeMemberRole'
import { SearchClassesUseCase } from './domain/usecases/classes/searchClasses'
import { AddGroupUseCase } from './domain/usecases/groups/addGroup'
import { GetGroupsUseCase } from './domain/usecases/groups/getGroups'
import { FindGroupUseCase } from './domain/usecases/groups/findGroup'
import { ListenToGroupUseCase } from './domain/usecases/groups/listenToGroup'
import { ListenToGroupsUseCase } from './domain/usecases/groups/listenToGroups'
import { UpdateGroupUseCase } from './domain/usecases/groups/updateGroup'
import { DeleteGroupUseCase } from './domain/usecases/groups/deleteGroup'
import { AddDiscussionUseCase } from './domain/usecases/discussions/addDiscussion'
import { GetGroupDiscussionsUseCase } from './domain/usecases/discussions/getGroupDiscussions'
import { GetClassDiscussionsUseCase } from './domain/usecases/discussions/getClassDiscussions'
import { FindDiscussionUseCase } from './domain/usecases/discussions/findDiscussion'
import { ListenToDiscussionUseCase } from './domain/usecases/discussions/listenToDiscussion'
import { ListenToGroupDiscussionsUseCase } from './domain/usecases/discussions/listenToGroupDiscussions'
import { ListenToClassDiscussionsUseCase } from './domain/usecases/discussions/listenToClassDiscussions'
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

export const AddAnnouncement = new AddAnnouncementUseCase(announcementRepository)
export const GetAnnouncements = new GetAnnouncementsUseCase(announcementRepository)
export const FindAnnouncement = new FindAnnouncementUseCase(announcementRepository)
export const ListenToAnnouncement = new ListenToAnnouncementUseCase(announcementRepository)
export const ListenToAnnouncements = new ListenToAnnouncementsUseCase(announcementRepository)
export const UpdateAnnouncement = new UpdateAnnouncementUseCase(announcementRepository)
export const DeleteAnnouncement = new DeleteAnnouncementUseCase(announcementRepository)

export const AddClass = new AddClassUseCase(classRepository)
export const GetMyClasses = new GetMyClassesUseCase(classRepository)
export const FindClass = new FindClassUseCase(classRepository)
export const ListenToClass = new ListenToClassUseCase(classRepository)
export const ListenToMyClasses = new ListenToMyClassesUseCase(classRepository)
export const UpdateClass = new UpdateClassUseCase(classRepository)
export const DeleteClass = new DeleteClassUseCase(classRepository)
export const RequestToJoinClass = new RequestClassUseCase(classRepository)
export const LeaveClass = new LeaveClassUseCase(classRepository)
export const AcceptClassRequest = new AcceptRequestUseCase(classRepository)
export const AddClassMembers = new AddMembersUseCase(classRepository)
export const ChangeClassMemberRole = new ChangeMemberRoleUseCase(classRepository)
export const SearchClasses = new SearchClassesUseCase(classRepository)

export const AddGroup = new AddGroupUseCase(groupRepository)
export const GetGroups = new GetGroupsUseCase(groupRepository)
export const FindGroup = new FindGroupUseCase(groupRepository)
export const ListenToGroup = new ListenToGroupUseCase(groupRepository)
export const ListenToGroups = new ListenToGroupsUseCase(groupRepository)
export const UpdateGroup = new UpdateGroupUseCase(groupRepository)
export const DeleteGroup = new DeleteGroupUseCase(groupRepository)

export const AddDiscussion = new AddDiscussionUseCase(discussionRepository)
export const GetGroupDiscussions = new GetGroupDiscussionsUseCase(discussionRepository)
export const GetClassDiscussions = new GetClassDiscussionsUseCase(discussionRepository)
export const FindDiscussion = new FindDiscussionUseCase(discussionRepository)
export const ListenToDiscussion = new ListenToDiscussionUseCase(discussionRepository)
export const ListenToGroupDiscussions = new ListenToGroupDiscussionsUseCase(discussionRepository)
export const ListenToClassDiscussions = new ListenToClassDiscussionsUseCase(discussionRepository)

export { AnnouncementEntity, AnnouncementFactory }
export { ClassEntity, ClassFactory, ClassUsers }
export { GroupEntity, GroupFactory }
export { DiscussionEntity, DiscussionFactory }
