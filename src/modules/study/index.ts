import { SetApiDataSource } from './data/datasources/set-api'
import { CourseApiDataSource } from './data/datasources/course-api'
import { InstitutionApiDataSource } from './data/datasources/institution-api'
import { FlashCardApiDataSource } from './data/datasources/flashCard-api'
import { NoteApiDataSource } from './data/datasources/note-api'
import { VideoApiDataSource } from './data/datasources/video-api'
import { VideoCommentApiDataSource } from './data/datasources/videoComment-api'
import { SetTransformer } from './data/transformers/set'
import { CourseTransformer } from './data/transformers/course'
import { InstitutionTransformer } from './data/transformers/institution'
import { FlashCardTransformer } from './data/transformers/flashCard'
import { NoteTransformer } from './data/transformers/note'
import { VideoTransformer } from './data/transformers/video'
import { VideoCommentTransformer } from './data/transformers/videoComment'
import { SetRepository } from './data/repositories/set'
import { CourseRepository } from './data/repositories/course'
import { InstitutionRepository } from './data/repositories/institution'
import { FlashCardRepository } from './data/repositories/flashCard'
import { NoteRepository } from './data/repositories/note'
import { VideoRepository } from './data/repositories/video'
import { VideoCommentRepository } from './data/repositories/videoComment'
import { CourseEntity } from './domain/entities/course'
import { CourseFactory } from './domain/factories/course'
import { InstitutionEntity } from './domain/entities/institution'
import { InstitutionFactory } from './domain/factories/institution'
import { FlashCardEntity } from './domain/entities/flashCard'
import { FlashCardFactory } from './domain/factories/flashCard'
import { NoteEntity } from './domain/entities/note'
import { NoteFactory } from './domain/factories/note'
import { VideoEntity } from './domain/entities/video'
import { VideoFactory } from './domain/factories/video'
import { VideoCommentEntity } from './domain/entities/videoComment'
import { VideoCommentFactory } from './domain/factories/videoComment'
import { GetSetsUseCase } from './domain/usecases/sets/getSets'
import { ListenToSetsUseCase } from './domain/usecases/sets/listenToSets'
import { FindSetUseCase } from './domain/usecases/sets/findSet'
import { AddSetUseCase } from './domain/usecases/sets/addSet'
import { EditSetUseCase } from './domain/usecases/sets/editSet'
import { DeleteSetUseCase } from './domain/usecases/sets/deleteSet'
import { GetCoursesUseCase } from './domain/usecases/courses/getCourses'
import { ListenToCoursesUseCase } from './domain/usecases/courses/listenToCourses'
import { FindCourseUseCase } from './domain/usecases/courses/findCourse'
import { AddCourseUseCase } from './domain/usecases/courses/addCourse'
import { EditCourseUseCase } from './domain/usecases/courses/editCourse'
import { DeleteCourseUseCase } from './domain/usecases/courses/deleteCourse'
import { DeleteVideoUseCase } from './domain/usecases/videos/deleteVideo'
import { DeleteInstitutionUseCase } from './domain/usecases/institutions/deleteInstitution'
import { DeleteVideoCommentUseCase } from './domain/usecases/videoComments/deleteVideoComment'
import { FindNoteUseCase } from './domain/usecases/notes/findNote'
import { AddVideoUseCase } from './domain/usecases/videos/addVideo'
import { FindVideoUseCase } from './domain/usecases/videos/findVideo'
import { DeleteNoteUseCase } from './domain/usecases/notes/deleteNote'
import { ListenToVideosUseCase } from './domain/usecases/videos/listenToVideos'
import { ListenToNotesUseCase } from './domain/usecases/notes/listenToNotes'
import { AddInstitutionUseCase } from './domain/usecases/institutions/addInstitution'
import { EditFlashCardUseCase } from './domain/usecases/flashCards/editFlashCard'
import { ListenToFlashCardsUseCase } from './domain/usecases/flashCards/listenToFlashCards'
import { AddFlashCardUseCase } from './domain/usecases/flashCards/addFlashCard'
import { GetFlashCardsUseCase } from './domain/usecases/flashCards/getFlashCards'
import { GetInstitutionsUseCase } from './domain/usecases/institutions/getInstitutions'
import { FindVideoCommentUseCase } from './domain/usecases/videoComments/findVideoComment'
import { AddNoteUseCase } from './domain/usecases/notes/addNote'
import { ListenToInstitutionsUseCase } from './domain/usecases/institutions/listenToInstitutions'
import { ListenToVideoCommentsUseCase } from './domain/usecases/videoComments/listenToVideoComments'
import { EditVideoUseCase } from './domain/usecases/videos/editVideo'
import { GetVideosUseCase } from './domain/usecases/videos/getVideos'
import { EditInstitutionUseCase } from './domain/usecases/institutions/editInstitution'
import { GetVideoCommentsUseCase } from './domain/usecases/videoComments/getVideoComments'
import { EditVideoCommentUseCase } from './domain/usecases/videoComments/editVideoComment'
import { FindInstitutionUseCase } from './domain/usecases/institutions/findInstitution'
import { EditNoteUseCase } from './domain/usecases/notes/editNote'
import { FindFlashCardUseCase } from './domain/usecases/flashCards/findFlashCard'
import { GetNotesUseCase } from './domain/usecases/notes/getNotes'
import { AddVideoCommentUseCase } from './domain/usecases/videoComments/addVideoComment'
import { DeleteFlashCardUseCase } from './domain/usecases/flashCards/deleteFlashCard'

const setDataSource = new SetApiDataSource()
const courseDataSource = new CourseApiDataSource()
const institutionDataSource = new InstitutionApiDataSource()
const flashCardDataSource = new FlashCardApiDataSource()
const noteDataSource = new NoteApiDataSource()
const videoDataSource = new VideoApiDataSource()
const videoCommentDataSource = new VideoCommentApiDataSource()

const setTransformer = new SetTransformer()
const courseTransformer = new CourseTransformer()
const institutionTransformer = new InstitutionTransformer()
const flashCardTransformer = new FlashCardTransformer()
const noteTransformer = new NoteTransformer()
const videoTransformer = new VideoTransformer()
const videoCommentTransformer = new VideoCommentTransformer()

const setRepository = new SetRepository(setDataSource, setTransformer)
const courseRepository = new CourseRepository(courseDataSource, courseTransformer)
const institutionRepository = new InstitutionRepository(institutionDataSource, institutionTransformer)
const flashCardRepository = new FlashCardRepository(flashCardDataSource, flashCardTransformer)
const noteRepository = new NoteRepository(noteDataSource, noteTransformer)
const videoRepository = new VideoRepository(videoDataSource, videoTransformer)
const videoCommentRepository = new VideoCommentRepository(videoCommentDataSource, videoCommentTransformer)

export const FindSet = new FindSetUseCase(setRepository)
export const GetSets = new GetSetsUseCase(setRepository)
export const ListenToSets = new ListenToSetsUseCase(setRepository)
export const AddSet = new AddSetUseCase(setRepository)
export const EditSet = new EditSetUseCase(setRepository)
export const DeleteSet = new DeleteSetUseCase(setRepository)

export const FindCourse = new FindCourseUseCase(courseRepository)
export const GetCourses = new GetCoursesUseCase(courseRepository)
export const ListenToCourses = new ListenToCoursesUseCase(courseRepository)
export const AddCourse = new AddCourseUseCase(courseRepository)
export const EditCourse = new EditCourseUseCase(courseRepository)
export const DeleteCourse = new DeleteCourseUseCase(courseRepository)

export const FindInstitution = new FindInstitutionUseCase(institutionRepository)
export const GetInstitutions = new GetInstitutionsUseCase(institutionRepository)
export const ListenToInstitutions = new ListenToInstitutionsUseCase(institutionRepository)
export const AddInstitution = new AddInstitutionUseCase(institutionRepository)
export const EditInstitution = new EditInstitutionUseCase(institutionRepository)
export const DeleteInstitution = new DeleteInstitutionUseCase(institutionRepository)

export const FindFlashCard = new FindFlashCardUseCase(flashCardRepository)
export const GetFlashCards = new GetFlashCardsUseCase(flashCardRepository)
export const ListenToFlashCards = new ListenToFlashCardsUseCase(flashCardRepository)
export const AddFlashCard = new AddFlashCardUseCase(flashCardRepository)
export const EditFlashCard = new EditFlashCardUseCase(flashCardRepository)
export const DeleteFlashCard = new DeleteFlashCardUseCase(flashCardRepository)

export const FindNote = new FindNoteUseCase(noteRepository)
export const GetNotes = new GetNotesUseCase(noteRepository)
export const ListenToNotes = new ListenToNotesUseCase(noteRepository)
export const AddNote = new AddNoteUseCase(noteRepository)
export const EditNote = new EditNoteUseCase(noteRepository)
export const DeleteNote = new DeleteNoteUseCase(noteRepository)

export const FindVideo = new FindVideoUseCase(videoRepository)
export const GetVideos = new GetVideosUseCase(videoRepository)
export const ListenToVideos = new ListenToVideosUseCase(videoRepository)
export const AddVideo = new AddVideoUseCase(videoRepository)
export const EditVideo = new EditVideoUseCase(videoRepository)
export const DeleteVideo = new DeleteVideoUseCase(videoRepository)

export const FindVideoComment = new FindVideoCommentUseCase(videoCommentRepository)
export const GetVideoComments = new GetVideoCommentsUseCase(videoCommentRepository)
export const ListenToVideoComments = new ListenToVideoCommentsUseCase(videoCommentRepository)
export const AddVideoComment = new AddVideoCommentUseCase(videoCommentRepository)
export const EditVideoComment = new EditVideoCommentUseCase(videoCommentRepository)
export const DeleteVideoComment = new DeleteVideoCommentUseCase(videoCommentRepository)

export { CourseEntity, CourseFactory }
export { InstitutionEntity, InstitutionFactory }
export { FlashCardEntity, FlashCardFactory }
export { NoteEntity, NoteFactory }
export { VideoEntity, VideoFactory }
export { VideoCommentEntity, VideoCommentFactory }
