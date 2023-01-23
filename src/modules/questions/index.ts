import { QuestionApiDataSource } from './data/datasources/questionApi'
import { AnswerApiDataSource } from './data/datasources/answerApi'
import { ConversationApiDataSource } from './data/datasources/conversationApi'
import { QuestionTransformer } from './data/transformers/question'
import { AnswerTransformer } from './data/transformers/answer'
import { QuestionRepository } from './data/repositories/question'
import { AnswerRepository } from './data/repositories/answer'
import { ConversationRepository } from './data/repositories/conversation'
import { QuestionsUseCase } from './domain/usecases/questions'
import { AnswersUseCase } from './domain/usecases/answers'
import { ConversationsUseCase } from './domain/usecases/conversations'
import { QuestionEntity } from './domain/entities/question'
import { QuestionFactory } from './domain/factories/question'
import { AnswerEntity } from './domain/entities/answer'
import { AnswerFactory } from './domain/factories/answer'

const questionDataSource = new QuestionApiDataSource()
const answerDataSource = new AnswerApiDataSource()
const conversationDataSource = new ConversationApiDataSource()

const questionTransformer = new QuestionTransformer()
const answerTransformer = new AnswerTransformer()

const questionRepository = new QuestionRepository(questionDataSource, questionTransformer)
const answerRepository = new AnswerRepository(answerDataSource, answerTransformer)
const conversationRepository = new ConversationRepository(conversationDataSource)

export const QuestionsUseCases = new QuestionsUseCase(questionRepository)
export const AnswersUseCases = new AnswersUseCase(answerRepository)
export const ConversationsUseCases = new ConversationsUseCase(conversationRepository)

export { QuestionEntity, QuestionFactory }
export { AnswerEntity, AnswerFactory }
