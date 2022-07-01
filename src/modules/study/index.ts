import { SetApiDataSource } from './data/datasources/set-api'
import { FlashCardApiDataSource } from './data/datasources/flashCard-api'
import { NoteApiDataSource } from './data/datasources/note-api'
import { TestPrepApiDataSource } from './data/datasources/testPrep-api'
import { TestApiDataSource } from './data/datasources/test-api'
import { SetTransformer } from './data/transformers/set'
import { FlashCardTransformer } from './data/transformers/flashCard'
import { NoteTransformer } from './data/transformers/note'
import { TestTransformer } from './data/transformers/test'
import { TestPrepTransformer } from './data/transformers/testPrep'
import { SetRepository } from './data/repositories/set'
import { FlashCardRepository } from './data/repositories/flashCard'
import { NoteRepository } from './data/repositories/note'
import { TestPrepRepository } from './data/repositories/testPrep'
import { TestRepository } from './data/repositories/test'
import { FlashCardEntity } from './domain/entities/flashCard'
import { FlashCardFactory } from './domain/factories/flashCard'
import { NoteEntity } from './domain/entities/note'
import { NoteFactory } from './domain/factories/note'
import { SetFactory } from './domain/factories/set'
import { SetEntity, SetSaved } from './domain/entities/set'
import { PrepData, PrepType, TestPrepEntity } from './domain/entities/testPrep'
import { TestPrepFactory } from './domain/factories/testPrep'
import { TestData, TestEntity, TestType } from './domain/entities/test'
import { SetsUseCase } from './domain/usecases/sets'
import { FlashCardsUseCase } from './domain/usecases/flashCards'
import { TestPrepsUseCase } from './domain/usecases/testPreps'
import { TestsUseCase } from './domain/usecases/tests'
import { NotesUseCase } from './domain/usecases/notes'

const setDataSource = new SetApiDataSource()
const flashCardDataSource = new FlashCardApiDataSource()
const testPrepDataSource = new TestPrepApiDataSource()
const testDataSource = new TestApiDataSource()
const noteDataSource = new NoteApiDataSource()

const setTransformer = new SetTransformer()
const flashCardTransformer = new FlashCardTransformer()
const testPrepTransformer = new TestPrepTransformer()
const testTransformer = new TestTransformer()
const noteTransformer = new NoteTransformer()

const setRepository = new SetRepository(setDataSource, setTransformer)
const flashCardRepository = new FlashCardRepository(flashCardDataSource, flashCardTransformer)
const testPrepRepository = new TestPrepRepository(testPrepDataSource, testPrepTransformer)
const testRepository = new TestRepository(testDataSource, testTransformer)
const noteRepository = new NoteRepository(noteDataSource, noteTransformer)

export const SetsUseCases = new SetsUseCase(setRepository)
export const FlashCardsUseCases = new FlashCardsUseCase(flashCardRepository)
export const TestPrepsUseCases = new TestPrepsUseCase(testPrepRepository)
export const TestsUseCases = new TestsUseCase(testRepository)
export const NotesUseCases = new NotesUseCase(noteRepository)

export { SetEntity, SetFactory, SetSaved }
export { FlashCardEntity, FlashCardFactory }
export { NoteEntity, NoteFactory }
export { TestPrepFactory, TestPrepEntity }
export { TestEntity }

export { PrepType } from './domain/entities/testPrep'
export type { PrepData } from './domain/entities/testPrep'
export { TestType } from './domain/entities/test'
export type { TestData } from './domain/entities/test'
