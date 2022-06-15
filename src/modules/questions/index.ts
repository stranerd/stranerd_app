import { QuestionApiDataSource } from './data/datasources/question-api'
import { AnswerApiDataSource } from './data/datasources/answer-api'
import { TagApiDataSource } from './data/datasources/tag-api'
import { QuestionTransformer } from './data/transformers/question'
import { AnswerTransformer } from './data/transformers/answer'
import { TagTransformer } from './data/transformers/tag'
import { QuestionRepository } from './data/repositories/question'
import { AnswerRepository } from './data/repositories/answer'
import { TagRepository } from './data/repositories/tag'
import { QuestionsUseCase } from './domain/usecases/questions'
import { AnswersUseCase } from './domain/usecases/answers'
import { TagsUseCase } from './domain/usecases/tags'
import { QuestionEntity } from './domain/entities/question'
import { QuestionFactory } from './domain/factories/question'
import { AnswerEntity } from './domain/entities/answer'
import { AnswerFactory } from './domain/factories/answer'
import { TagEntity } from './domain/entities/tag'
import { TagFactory } from './domain/factories/tag'

const questionDataSource = new QuestionApiDataSource()
const answerDataSource = new AnswerApiDataSource()
const tagDataSource = new TagApiDataSource()

const questionTransformer = new QuestionTransformer()
const answerTransformer = new AnswerTransformer()
const tagTransformer = new TagTransformer()

const questionRepository = new QuestionRepository(questionDataSource, questionTransformer)
const answerRepository = new AnswerRepository(answerDataSource, answerTransformer)
const tagRepository = new TagRepository(tagDataSource, tagTransformer)

export const QuestionsUseCases = new QuestionsUseCase(questionRepository)
export const AnswersUseCases = new AnswersUseCase(answerRepository)
export const TagsUseCases = new TagsUseCase(tagRepository)

export { QuestionEntity, QuestionFactory }
export { AnswerEntity, AnswerFactory }
export { TagEntity, TagFactory }
