import { SetApiDataSource } from './data/datasources/set-api'
import { FlashCardApiDataSource } from './data/datasources/flashCard-api'
import { DocumentApiDataSource } from './data/datasources/document-api'
import { TestPrepApiDataSource } from './data/datasources/testPrep-api'
import { TestApiDataSource } from './data/datasources/test-api'
import { SetTransformer } from './data/transformers/set'
import { FlashCardTransformer } from './data/transformers/flashCard'
import { DocumentTransformer } from './data/transformers/document'
import { TestTransformer } from './data/transformers/test'
import { TestPrepTransformer } from './data/transformers/testPrep'
import { SetRepository } from './data/repositories/set'
import { FlashCardRepository } from './data/repositories/flashCard'
import { DocumentRepository } from './data/repositories/document'
import { TestPrepRepository } from './data/repositories/testPrep'
import { TestRepository } from './data/repositories/test'
import { FlashCardEntity } from './domain/entities/flashCard'
import { FlashCardFactory } from './domain/factories/flashCard'
import { DocumentEntity } from './domain/entities/document'
import { DocumentFactory } from './domain/factories/document'
import { SetFactory } from './domain/factories/set'
import { SetEntity, SetSaved } from './domain/entities/set'
import { PrepData, PrepType, TestPrepEntity } from './domain/entities/testPrep'
import { TestPrepFactory } from './domain/factories/testPrep'
import { TestData, TestEntity, TestType } from './domain/entities/test'
import { SetsUseCase } from './domain/usecases/sets'
import { FlashCardsUseCase } from './domain/usecases/flashCards'
import { TestPrepsUseCase } from './domain/usecases/testPreps'
import { TestsUseCase } from './domain/usecases/tests'
import { DocumentsUseCase } from './domain/usecases/documents'

const setDataSource = new SetApiDataSource()
const flashCardDataSource = new FlashCardApiDataSource()
const testPrepDataSource = new TestPrepApiDataSource()
const testDataSource = new TestApiDataSource()
const documentDataSource = new DocumentApiDataSource()

const setTransformer = new SetTransformer()
const flashCardTransformer = new FlashCardTransformer()
const testPrepTransformer = new TestPrepTransformer()
const testTransformer = new TestTransformer()
const documentTransformer = new DocumentTransformer()

const setRepository = new SetRepository(setDataSource, setTransformer)
const flashCardRepository = new FlashCardRepository(flashCardDataSource, flashCardTransformer)
const testPrepRepository = new TestPrepRepository(testPrepDataSource, testPrepTransformer)
const testRepository = new TestRepository(testDataSource, testTransformer)
const documentRepository = new DocumentRepository(documentDataSource, documentTransformer)

export const SetsUseCases = new SetsUseCase(setRepository)
export const FlashCardsUseCases = new FlashCardsUseCase(flashCardRepository)
export const TestPrepsUseCases = new TestPrepsUseCase(testPrepRepository)
export const TestsUseCases = new TestsUseCase(testRepository)
export const DocumentsUseCases = new DocumentsUseCase(documentRepository)

export { SetEntity, SetFactory, SetSaved }
export { FlashCardEntity, FlashCardFactory }
export { DocumentEntity, DocumentFactory }
export { TestPrepFactory, TestPrepEntity }
export { TestEntity }

export { PrepType } from './domain/entities/testPrep'
export type { PrepData } from './domain/entities/testPrep'
export { TestType } from './domain/entities/test'
export type { TestData } from './domain/entities/test'
