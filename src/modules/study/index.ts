import { SetApiDataSource } from './data/datasources/set-api'
import { FlashCardApiDataSource } from './data/datasources/flashCard-api'
import { NoteApiDataSource } from './data/datasources/note-api'
import { VideoApiDataSource } from './data/datasources/video-api'
import { CommentApiDataSource } from './data/datasources/comment-api'
import { TestPrepApiDataSource } from './data/datasources/testPrep-api'
import { TestApiDataSource } from './data/datasources/test-api'
import { SetTransformer } from './data/transformers/set'
import { FlashCardTransformer } from './data/transformers/flashCard'
import { NoteTransformer } from './data/transformers/note'
import { TestTransformer } from './data/transformers/test'
import { VideoTransformer } from './data/transformers/video'
import { TestPrepTransformer } from './data/transformers/testPrep'
import { CommentTransformer } from './data/transformers/comment'
import { SetRepository } from './data/repositories/set'
import { FlashCardRepository } from './data/repositories/flashCard'
import { NoteRepository } from './data/repositories/note'
import { VideoRepository } from './data/repositories/video'
import { CommentRepository } from './data/repositories/comment'
import { TestPrepRepository } from './data/repositories/testPrep'
import { TestRepository } from './data/repositories/test'
import { FlashCardEntity } from './domain/entities/flashCard'
import { FlashCardFactory } from './domain/factories/flashCard'
import { NoteEntity } from './domain/entities/note'
import { NoteFactory } from './domain/factories/note'
import { SetFactory } from './domain/factories/set'
import { SetEntity } from './domain/entities/set'
import { VideoEntity } from './domain/entities/video'
import { VideoFactory } from './domain/factories/video'
import { CommentData, CommentEntity, CommentType } from './domain/entities/comment'
import { CommentFactory } from './domain/factories/comment'
import { PrepData, PrepType, TestPrepEntity } from './domain/entities/testPrep'
import { TestPrepFactory } from './domain/factories/testPrep'
import { TestData, TestEntity, TestType } from './domain/entities/test'
import { GetSetsUseCase } from './domain/usecases/sets/getSets'
import { SearchSetsUseCase } from './domain/usecases/sets/searchSets'
import { GetUserSetsUseCase } from './domain/usecases/sets/getUserSets'
import { GetSetsInSetUseCase } from './domain/usecases/sets/getSetsInSet'
import { ListenToSetsUseCase } from './domain/usecases/sets/listenToSets'
import { ListenToUserSetsUseCase } from './domain/usecases/sets/listenToUserSets'
import { ListenToSetsInSetUseCase } from './domain/usecases/sets/listenToSetsInSet'
import { FindSetUseCase } from './domain/usecases/sets/findSet'
import { AddSetUseCase } from './domain/usecases/sets/addSet'
import { EditSetUseCase } from './domain/usecases/sets/editSet'
import { DeleteSetUseCase } from './domain/usecases/sets/deleteSet'
import { ListenToSetUseCase } from './domain/usecases/sets/listenToSet'
import { SaveSetPropUseCase } from './domain/usecases/sets/saveSetProp'
import { DeleteSetPropUseCase } from './domain/usecases/sets/deleteSetProp'
import { AddNoteUseCase } from './domain/usecases/notes/addNote'
import { FindNoteUseCase } from './domain/usecases/notes/findNote'
import { DeleteNoteUseCase } from './domain/usecases/notes/deleteNote'
import { GetNotesInSetUseCase } from './domain/usecases/notes/getNotesInSet'
import { GetUserNotesUseCase } from './domain/usecases/notes/getUserNotes'
import { ListenToNoteUseCase } from './domain/usecases/notes/listenToNote'
import { ListenToNotesUseCase } from './domain/usecases/notes/listenToNotes'
import { ListenToUserNotesUseCase } from './domain/usecases/notes/listenToUserNotes'
import { ListenToNotesInSetUseCase } from './domain/usecases/notes/listenToNotesInSet'
import { EditNoteUseCase } from './domain/usecases/notes/editNote'
import { GetNotesUseCase } from './domain/usecases/notes/getNotes'
import { SearchNotesUseCase } from './domain/usecases/notes/searchNotes'
import { AddVideoUseCase } from './domain/usecases/videos/addVideo'
import { FindVideoUseCase } from './domain/usecases/videos/findVideo'
import { DeleteVideoUseCase } from './domain/usecases/videos/deleteVideo'
import { ListenToVideoUseCase } from './domain/usecases/videos/listenToVideo'
import { ListenToVideosUseCase } from './domain/usecases/videos/listenToVideos'
import { ListenToUserVideosUseCase } from './domain/usecases/videos/listenToUserVideos'
import { ListenToVideosInSetUseCase } from './domain/usecases/videos/listenToVideosInSet'
import { EditVideoUseCase } from './domain/usecases/videos/editVideo'
import { GetVideosUseCase } from './domain/usecases/videos/getVideos'
import { SearchVideosUseCase } from './domain/usecases/videos/searchVideos'
import { GetUserVideosUseCase } from './domain/usecases/videos/getUserVideos'
import { GetVideosInSetUseCase } from './domain/usecases/videos/getVideosInSet'
import { EditFlashCardUseCase } from './domain/usecases/flashCards/editFlashCard'
import { ListenToFlashCardUseCase } from './domain/usecases/flashCards/listenToFlashCard'
import { ListenToFlashCardsUseCase } from './domain/usecases/flashCards/listenToFlashCards'
import { ListenToUserFlashCardsUseCase } from './domain/usecases/flashCards/listenToUserFlashCards'
import { ListenToFlashCardsInSetUseCase } from './domain/usecases/flashCards/listenToFlashCardsInSet'
import { AddFlashCardUseCase } from './domain/usecases/flashCards/addFlashCard'
import { GetFlashCardsUseCase } from './domain/usecases/flashCards/getFlashCards'
import { SearchFlashCardsUseCase } from './domain/usecases/flashCards/searchFlashCards'
import { GetUserFlashCardsUseCase } from './domain/usecases/flashCards/getUserFlashCards'
import { FindFlashCardUseCase } from './domain/usecases/flashCards/findFlashCard'
import { GetFlashCardsInSetUseCase } from './domain/usecases/flashCards/getFlashCardsInSet'
import { DeleteFlashCardUseCase } from './domain/usecases/flashCards/deleteFlashCard'
import { FindCommentUseCase } from './domain/usecases/comments/findComment'
import { DeleteCommentUseCase } from './domain/usecases/comments/deleteComment'
import { ListenToVideoCommentsUseCase } from './domain/usecases/comments/listenToVideoComments'
import { GetVideoCommentsUseCase } from './domain/usecases/comments/getVideoComments'
import { AddCommentUseCase } from './domain/usecases/comments/addComment'
import { EditCommentUseCase } from './domain/usecases/comments/editComment'
import { GetTestPrepsUseCase } from './domain/usecases/testPreps/getTestPreps'
import { SearchTestPrepsUseCase } from './domain/usecases/testPreps/searchTestPreps'
import { GetTestPrepsInSetUseCase } from './domain/usecases/testPreps/getTestPrepsInSet'
import { ListenToTestPrepsUseCase } from './domain/usecases/testPreps/listenToTestPreps'
import { ListenToTestPrepsInSetUseCase } from './domain/usecases/testPreps/listenToTestPrepsInSet'
import { FindTestPrepUseCase } from './domain/usecases/testPreps/findTestPrep'
import { AddTestPrepUseCase } from './domain/usecases/testPreps/addTestPrep'
import { EditTestPrepUseCase } from './domain/usecases/testPreps/editTestPrep'
import { DeleteTestPrepUseCase } from './domain/usecases/testPreps/deleteTestPrep'
import { GetTestsUseCase } from './domain/usecases/tests/getTests'
import { ListenToTestsUseCase } from './domain/usecases/tests/listenToTests'
import { ListenToTestUseCase } from './domain/usecases/tests/listenToTest'
import { FindTestUseCase } from './domain/usecases/tests/findTest'
import { AddTestUseCase } from './domain/usecases/tests/addTest'
import { EndTestUseCase } from './domain/usecases/tests/endTest'
import { UpdateTestAnswerUseCase } from './domain/usecases/tests/updateTestAnswer'

const setDataSource = new SetApiDataSource()
const flashCardDataSource = new FlashCardApiDataSource()
const noteDataSource = new NoteApiDataSource()
const videoDataSource = new VideoApiDataSource()
const commentDataSource = new CommentApiDataSource()
const testPrepDataSource = new TestPrepApiDataSource()
const testDataSource = new TestApiDataSource()

const setTransformer = new SetTransformer()
const flashCardTransformer = new FlashCardTransformer()
const noteTransformer = new NoteTransformer()
const videoTransformer = new VideoTransformer()
const commentTransformer = new CommentTransformer()
const testPrepTransformer = new TestPrepTransformer()
const testTransformer = new TestTransformer()

const setRepository = new SetRepository(setDataSource, setTransformer)
const flashCardRepository = new FlashCardRepository(flashCardDataSource, flashCardTransformer)
const noteRepository = new NoteRepository(noteDataSource, noteTransformer)
const videoRepository = new VideoRepository(videoDataSource, videoTransformer)
const commentRepository = new CommentRepository(commentDataSource, commentTransformer)
const testPrepRepository = new TestPrepRepository(testPrepDataSource, testPrepTransformer)
const testRepository = new TestRepository(testDataSource, testTransformer)

export const FindSet = new FindSetUseCase(setRepository)
export const GetSets = new GetSetsUseCase(setRepository)
export const SearchSets = new SearchSetsUseCase(setRepository)
export const GetSetsInSet = new GetSetsInSetUseCase(setRepository)
export const ListenToSetsInSet = new ListenToSetsInSetUseCase(setRepository)
export const GetUserSets = new GetUserSetsUseCase(setRepository)
export const ListenToSets = new ListenToSetsUseCase(setRepository)
export const ListenToUserSets = new ListenToUserSetsUseCase(setRepository)
export const AddSet = new AddSetUseCase(setRepository)
export const EditSet = new EditSetUseCase(setRepository)
export const DeleteSet = new DeleteSetUseCase(setRepository)
export const ListenToSet = new ListenToSetUseCase(setRepository)
export const SaveSetProp = new SaveSetPropUseCase(setRepository)
export const DeleteSetProp = new DeleteSetPropUseCase(setRepository)

export const FindFlashCard = new FindFlashCardUseCase(flashCardRepository)
export const GetFlashCards = new GetFlashCardsUseCase(flashCardRepository)
export const SearchFlashCards = new SearchFlashCardsUseCase(flashCardRepository)
export const GetUserFlashCards = new GetUserFlashCardsUseCase(flashCardRepository)
export const GetFlashCardsInSet = new GetFlashCardsInSetUseCase(flashCardRepository)
export const ListenToFlashCard = new ListenToFlashCardUseCase(flashCardRepository)
export const ListenToFlashCards = new ListenToFlashCardsUseCase(flashCardRepository)
export const ListenToUserFlashCards = new ListenToUserFlashCardsUseCase(flashCardRepository)
export const ListenToFlashCardsInSet = new ListenToFlashCardsInSetUseCase(flashCardRepository)
export const AddFlashCard = new AddFlashCardUseCase(flashCardRepository)
export const EditFlashCard = new EditFlashCardUseCase(flashCardRepository)
export const DeleteFlashCard = new DeleteFlashCardUseCase(flashCardRepository)

export const FindNote = new FindNoteUseCase(noteRepository)
export const GetNotes = new GetNotesUseCase(noteRepository)
export const SearchNotes = new SearchNotesUseCase(noteRepository)
export const GetUserNotes = new GetUserNotesUseCase(noteRepository)
export const GetNotesInSet = new GetNotesInSetUseCase(noteRepository)
export const ListenToNote = new ListenToNoteUseCase(noteRepository)
export const ListenToNotes = new ListenToNotesUseCase(noteRepository)
export const ListenToUserNotes = new ListenToUserNotesUseCase(noteRepository)
export const ListenToNotesInSet = new ListenToNotesInSetUseCase(noteRepository)
export const AddNote = new AddNoteUseCase(noteRepository)
export const EditNote = new EditNoteUseCase(noteRepository)
export const DeleteNote = new DeleteNoteUseCase(noteRepository)

export const FindVideo = new FindVideoUseCase(videoRepository)
export const GetVideos = new GetVideosUseCase(videoRepository)
export const SearchVideos = new SearchVideosUseCase(videoRepository)
export const GetUserVideos = new GetUserVideosUseCase(videoRepository)
export const GetVideosInSet = new GetVideosInSetUseCase(videoRepository)
export const ListenToVideo = new ListenToVideoUseCase(videoRepository)
export const ListenToVideos = new ListenToVideosUseCase(videoRepository)
export const ListenToUserVideos = new ListenToUserVideosUseCase(videoRepository)
export const ListenToVideosInSet = new ListenToVideosInSetUseCase(videoRepository)
export const AddVideo = new AddVideoUseCase(videoRepository)
export const EditVideo = new EditVideoUseCase(videoRepository)
export const DeleteVideo = new DeleteVideoUseCase(videoRepository)

export const FindComment = new FindCommentUseCase(commentRepository)
export const GetVideoComments = new GetVideoCommentsUseCase(commentRepository)
export const ListenToVideoComments = new ListenToVideoCommentsUseCase(commentRepository)
export const AddComment = new AddCommentUseCase(commentRepository)
export const EditComment = new EditCommentUseCase(commentRepository)
export const DeleteComment = new DeleteCommentUseCase(commentRepository)

export const FindTestPrep = new FindTestPrepUseCase(testPrepRepository)
export const GetTestPreps = new GetTestPrepsUseCase(testPrepRepository)
export const SearchTestPreps = new SearchTestPrepsUseCase(testPrepRepository)
export const GetTestPrepsInSet = new GetTestPrepsInSetUseCase(testPrepRepository)
export const ListenToTestPreps = new ListenToTestPrepsUseCase(testPrepRepository)
export const ListenToTestPrepsInSet = new ListenToTestPrepsInSetUseCase(testPrepRepository)
export const AddTestPrep = new AddTestPrepUseCase(testPrepRepository)
export const EditTestPrep = new EditTestPrepUseCase(testPrepRepository)
export const DeleteTestPrep = new DeleteTestPrepUseCase(testPrepRepository)

export const FindTest = new FindTestUseCase(testRepository)
export const GetTests = new GetTestsUseCase(testRepository)
export const ListenToTests = new ListenToTestsUseCase(testRepository)
export const ListenToTest = new ListenToTestUseCase(testRepository)
export const AddTest = new AddTestUseCase(testRepository)
export const EndTest = new EndTestUseCase(testRepository)
export const UpdateTestAnswer = new UpdateTestAnswerUseCase(testRepository)

export { SetEntity, SetFactory }
export { FlashCardEntity, FlashCardFactory }
export { NoteEntity, NoteFactory }
export { VideoEntity, VideoFactory }
export { CommentEntity, CommentFactory }
export { TestPrepFactory, TestPrepEntity }
export { TestEntity }

export { CommentType } from './domain/entities/comment'
export type { CommentData } from './domain/entities/comment'
export { PrepType } from './domain/entities/testPrep'
export type { PrepData } from './domain/entities/testPrep'
export { TestType } from './domain/entities/test'
export type { TestData } from './domain/entities/test'
