import { SetApiDataSource } from './data/datasources/set-api'
import { CourseApiDataSource } from './data/datasources/course-api'
import { InstitutionApiDataSource } from './data/datasources/institution-api'
import { FlashCardApiDataSource } from './data/datasources/flashCard-api'
import { NoteApiDataSource } from './data/datasources/note-api'
import { VideoApiDataSource } from './data/datasources/video-api'
import { VideoCommentApiDataSource } from './data/datasources/videoComment-api'
import { PastQuestionApiDataSource } from './data/datasources/pastQuestion-api'
import { TestPrepApiDataSource } from './data/datasources/testPrep-api'
import { TestApiDataSource } from './data/datasources/test-api'
import { SetTransformer } from './data/transformers/set'
import { CourseTransformer } from './data/transformers/course'
import { InstitutionTransformer } from './data/transformers/institution'
import { FlashCardTransformer } from './data/transformers/flashCard'
import { NoteTransformer } from './data/transformers/note'
import { VideoTransformer } from './data/transformers/video'
import { VideoCommentTransformer } from './data/transformers/videoComment'
import { PastQuestionTransformer } from './data/transformers/pastQuestion'
import { TestPrepTransformer } from './data/transformers/testPrep'
import { TestTransformer } from './data/transformers/test'
import { SetRepository } from './data/repositories/set'
import { CourseRepository } from './data/repositories/course'
import { InstitutionRepository } from './data/repositories/institution'
import { FlashCardRepository } from './data/repositories/flashCard'
import { NoteRepository } from './data/repositories/note'
import { VideoRepository } from './data/repositories/video'
import { VideoCommentRepository } from './data/repositories/videoComment'
import { PastQuestionRepository } from './data/repositories/pastQuestion'
import { TestPrepRepository } from './data/repositories/testPrep'
import { TestRepository } from './data/repositories/test'
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
import { GetPastQuestionsUseCase } from './domain/usecases/pastQuestions/getPastQuestions'
import { ListenToPastQuestionsUseCase } from './domain/usecases/pastQuestions/listenToPastQuestions'
import { FindPastQuestionUseCase } from './domain/usecases/pastQuestions/findPastQuestion'
import { AddPastQuestionUseCase } from './domain/usecases/pastQuestions/addPastQuestion'
import { EditPastQuestionUseCase } from './domain/usecases/pastQuestions/editPastQuestion'
import { DeletePastQuestionUseCase } from './domain/usecases/pastQuestions/deletePastQuestion'
import { GetTestQuestionsUseCase } from './domain/usecases/pastQuestions/getTestQuestions'
import { PastQuestionData, PastQuestionEntity, PastQuestionType } from './domain/entities/pastQuestion'
import { PastQuestionFactory } from './domain/factories/pastQuestion'
import { GetTestPrepsUseCase } from './domain/usecases/testPreps/getTestPreps'
import { ListenToTestPrepsUseCase } from './domain/usecases/testPreps/listenToTestPreps'
import { FindTestPrepUseCase } from './domain/usecases/testPreps/findTestPrep'
import { AddTestPrepUseCase } from './domain/usecases/testPreps/addTestPrep'
import { EditTestPrepUseCase } from './domain/usecases/testPreps/editTestPrep'
import { DeleteTestPrepUseCase } from './domain/usecases/testPreps/deleteTestPrep'
import { PrepData, PrepType, TestPrepEntity } from './domain/entities/testPrep'
import { TestPrepFactory } from './domain/factories/testPrep'
import { GetTestsUseCase } from './domain/usecases/tests/getTests'
import { ListenToTestsUseCase } from './domain/usecases/tests/listenToTests'
import { FindTestUseCase } from './domain/usecases/tests/findTest'
import { AddTestUseCase } from './domain/usecases/tests/addTest'
import { EndTestUseCase } from './domain/usecases/tests/endTest'
import { UpdateTestAnswerUseCase } from './domain/usecases/tests/updateTestAnswer'
import { TestData, TestEntity, TestType } from './domain/entities/test'

const setDataSource = new SetApiDataSource()
const courseDataSource = new CourseApiDataSource()
const institutionDataSource = new InstitutionApiDataSource()
const flashCardDataSource = new FlashCardApiDataSource()
const noteDataSource = new NoteApiDataSource()
const videoDataSource = new VideoApiDataSource()
const videoCommentDataSource = new VideoCommentApiDataSource()
const pastQuestionDataSource = new PastQuestionApiDataSource()
const testPrepDataSource = new TestPrepApiDataSource()
const testDataSource = new TestApiDataSource()

const setTransformer = new SetTransformer()
const courseTransformer = new CourseTransformer()
const institutionTransformer = new InstitutionTransformer()
const flashCardTransformer = new FlashCardTransformer()
const noteTransformer = new NoteTransformer()
const videoTransformer = new VideoTransformer()
const videoCommentTransformer = new VideoCommentTransformer()
const pastQuestionTransformer = new PastQuestionTransformer()
const testPrepTransformer = new TestPrepTransformer()
const testTransformer = new TestTransformer()

const setRepository = new SetRepository(setDataSource, setTransformer)
const courseRepository = new CourseRepository(courseDataSource, courseTransformer)
const institutionRepository = new InstitutionRepository(institutionDataSource, institutionTransformer)
const flashCardRepository = new FlashCardRepository(flashCardDataSource, flashCardTransformer)
const noteRepository = new NoteRepository(noteDataSource, noteTransformer)
const videoRepository = new VideoRepository(videoDataSource, videoTransformer)
const videoCommentRepository = new VideoCommentRepository(videoCommentDataSource, videoCommentTransformer)
const pastQuestionRepository = new PastQuestionRepository(pastQuestionDataSource, pastQuestionTransformer)
const testPrepRepository = new TestPrepRepository(testPrepDataSource, testPrepTransformer)
const testRepository = new TestRepository(testDataSource, testTransformer)

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

export const FindPastQuestion = new FindPastQuestionUseCase(pastQuestionRepository)
export const GetPastQuestions = new GetPastQuestionsUseCase(pastQuestionRepository)
export const ListenToPastQuestions = new ListenToPastQuestionsUseCase(pastQuestionRepository)
export const AddPastQuestion = new AddPastQuestionUseCase(pastQuestionRepository)
export const EditPastQuestion = new EditPastQuestionUseCase(pastQuestionRepository)
export const DeletePastQuestion = new DeletePastQuestionUseCase(pastQuestionRepository)
export const GetTestQuestions = new GetTestQuestionsUseCase(pastQuestionRepository)

export const FindTestPrep = new FindTestPrepUseCase(testPrepRepository)
export const GetTestPreps = new GetTestPrepsUseCase(testPrepRepository)
export const ListenToTestPreps = new ListenToTestPrepsUseCase(testPrepRepository)
export const AddTestPrep = new AddTestPrepUseCase(testPrepRepository)
export const EditTestPrep = new EditTestPrepUseCase(testPrepRepository)
export const DeleteTestPrep = new DeleteTestPrepUseCase(testPrepRepository)

export const FindTest = new FindTestUseCase(testRepository)
export const GetTests = new GetTestsUseCase(testRepository)
export const ListenToTests = new ListenToTestsUseCase(testRepository)
export const AddTest = new AddTestUseCase(testRepository)
export const EndTest = new EndTestUseCase(testRepository)
export const UpdateTestAnswer = new UpdateTestAnswerUseCase(testRepository)

export { CourseEntity, CourseFactory }
export { InstitutionEntity, InstitutionFactory }
export { FlashCardEntity, FlashCardFactory }
export { NoteEntity, NoteFactory }
export { VideoEntity, VideoFactory }
export { VideoCommentEntity, VideoCommentFactory }
export { PastQuestionFactory, PastQuestionEntity, PastQuestionData, PastQuestionType }
export { TestPrepFactory, TestPrepEntity, PrepData, PrepType }
export { TestData, TestType, TestEntity }
