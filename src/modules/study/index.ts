import { SetApiDataSource } from './data/datasources/set-api'
import { FlashCardApiDataSource } from './data/datasources/flashCard-api'
import { NoteApiDataSource } from './data/datasources/note-api'
import { DocumentApiDataSource } from './data/datasources/document-api'
import { VideoApiDataSource } from './data/datasources/video-api'
import { TestPrepApiDataSource } from './data/datasources/testPrep-api'
import { TestApiDataSource } from './data/datasources/test-api'
import { SetTransformer } from './data/transformers/set'
import { FlashCardTransformer } from './data/transformers/flashCard'
import { NoteTransformer } from './data/transformers/note'
import { DocumentTransformer } from './data/transformers/document'
import { TestTransformer } from './data/transformers/test'
import { VideoTransformer } from './data/transformers/video'
import { TestPrepTransformer } from './data/transformers/testPrep'
import { SetRepository } from './data/repositories/set'
import { FlashCardRepository } from './data/repositories/flashCard'
import { NoteRepository } from './data/repositories/note'
import { DocumentRepository } from './data/repositories/document'
import { VideoRepository } from './data/repositories/video'
import { TestPrepRepository } from './data/repositories/testPrep'
import { TestRepository } from './data/repositories/test'
import { FlashCardEntity } from './domain/entities/flashCard'
import { FlashCardFactory } from './domain/factories/flashCard'
import { NoteEntity } from './domain/entities/note'
import { NoteFactory } from './domain/factories/note'
import { DocumentEntity } from './domain/entities/document'
import { DocumentFactory } from './domain/factories/document'
import { SetFactory } from './domain/factories/set'
import { SetEntity, SetSaved } from './domain/entities/set'
import { VideoEntity } from './domain/entities/video'
import { VideoFactory } from './domain/factories/video'
import { PrepData, PrepType, TestPrepEntity } from './domain/entities/testPrep'
import { TestPrepFactory } from './domain/factories/testPrep'
import { TestData, TestEntity, TestType } from './domain/entities/test'
import { SetsUseCase } from './domain/usecases/sets'
import { NotesUseCase } from './domain/usecases/notes'
import { VideosUseCase } from './domain/usecases/videos'
import { FlashCardsUseCase } from './domain/usecases/flashCards'
import { TestPrepsUseCase } from './domain/usecases/testPreps'
import { TestsUseCase } from './domain/usecases/tests'
import { DocumentsUseCase } from './domain/usecases/documents'

const setDataSource = new SetApiDataSource()
const flashCardDataSource = new FlashCardApiDataSource()
const noteDataSource = new NoteApiDataSource()
const videoDataSource = new VideoApiDataSource()
const testPrepDataSource = new TestPrepApiDataSource()
const testDataSource = new TestApiDataSource()
const documentDataSource = new DocumentApiDataSource()

const setTransformer = new SetTransformer()
const flashCardTransformer = new FlashCardTransformer()
const noteTransformer = new NoteTransformer()
const videoTransformer = new VideoTransformer()
const testPrepTransformer = new TestPrepTransformer()
const testTransformer = new TestTransformer()
const documentTransformer = new DocumentTransformer()

const setRepository = new SetRepository(setDataSource, setTransformer)
const flashCardRepository = new FlashCardRepository(flashCardDataSource, flashCardTransformer)
const noteRepository = new NoteRepository(noteDataSource, noteTransformer)
const videoRepository = new VideoRepository(videoDataSource, videoTransformer)
const testPrepRepository = new TestPrepRepository(testPrepDataSource, testPrepTransformer)
const testRepository = new TestRepository(testDataSource, testTransformer)
const documentRepository = new DocumentRepository(documentDataSource, documentTransformer)

export const SetsUseCases = new SetsUseCase(setRepository)
export const NotesUseCases = new NotesUseCase(noteRepository)
export const VideosUseCases = new VideosUseCase(videoRepository)
export const FlashCardsUseCases = new FlashCardsUseCase(flashCardRepository)

export const TestPrepsUseCases = new TestPrepsUseCase(testPrepRepository)
export const TestsUseCases = new TestsUseCase(testRepository)
export const DocumentsUseCases = new DocumentsUseCase(documentRepository)

export { SetEntity, SetFactory, SetSaved }
export { FlashCardEntity, FlashCardFactory }
export { NoteEntity, NoteFactory }
export { DocumentEntity, DocumentFactory }
export { VideoEntity, VideoFactory }
export { TestPrepFactory, TestPrepEntity }
export { TestEntity }

export { PrepType } from './domain/entities/testPrep'
export type { PrepData } from './domain/entities/testPrep'
export { TestType } from './domain/entities/test'
export type { TestData } from './domain/entities/test'
