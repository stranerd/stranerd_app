import { QuestionApiDataSource } from './data/datasources/question-api'
import { AnswerApiDataSource } from './data/datasources/answer-api'
import { CommentApiDataSource } from './data/datasources/comment-api'
import { QuestionTransformer } from './data/transformers/question'
import { AnswerTransformer } from './data/transformers/answer'
import { CommentTransformer } from './data/transformers/comment'
import { QuestionRepository } from './data/repositories/question'
import { AnswerRepository } from './data/repositories/answer'
import { CommentRepository } from './data/repositories/comment'
import { FindQuestionUseCase } from './domain/usecases/questions/findQuestion'
import { GetQuestionsUseCase } from './domain/usecases/questions/getQuestions'
import { GetUserQuestionsUseCase } from './domain/usecases/questions/getUserQuestions'
import { ListenToUserQuestionsUseCase } from './domain/usecases/questions/listenToUserQuestions'
import { AddQuestionUseCase } from './domain/usecases/questions/addQuestion'
import { EditQuestionUseCase } from './domain/usecases/questions/editQuestion'
import { DeleteQuestionUseCase } from './domain/usecases/questions/deleteQuestion'
import { MarkBestAnswerUseCase } from './domain/usecases/questions/markBestAnswer'
import { ListenToQuestionUseCase } from './domain/usecases/questions/listenToQuestion'
import { ListenToQuestionsUseCase } from './domain/usecases/questions/listenToQuestions'
import { GetAnswersUseCase } from './domain/usecases/answers/getAnswers'
import { GetUserAnswersUseCase } from './domain/usecases/answers/getUserAnswers'
import { ListenToUserAnswersUseCase } from './domain/usecases/answers/listenToUserAnswers'
import { AddAnswerUseCase } from './domain/usecases/answers/addAnswer'
import { EditAnswerUseCase } from './domain/usecases/answers/editAnswer'
import { DeleteAnswerUseCase } from './domain/usecases/answers/deleteAnswer'
import { ListenToAnswersUseCase } from './domain/usecases/answers/listenToAnswers'
import { VoteAnswerUseCase } from './domain/usecases/answers/voteAnswer'
import { AddAnswerCommentUseCase } from './domain/usecases/comments/addComment'
import { GetAnswerCommentsUseCase } from './domain/usecases/comments/getComments'
import { ListenToAnswerCommentsUseCase } from './domain/usecases/comments/listenToComments'
import { QuestionEntity } from './domain/entities/question'
import { QuestionFactory } from './domain/factories/question'
import { AnswerEntity } from './domain/entities/answer'
import { AnswerFactory } from './domain/factories/answer'
import { CommentEntity } from './domain/entities/comment'
import { CommentFactory } from './domain/factories/comment'

const questionDataSource = new QuestionApiDataSource()
const answerDataSource = new AnswerApiDataSource()
const commentDataSource = new CommentApiDataSource()

const questionTransformer = new QuestionTransformer()
const answerTransformer = new AnswerTransformer()
const commentTransformer = new CommentTransformer()

const questionRepository = new QuestionRepository(questionDataSource, questionTransformer)
const answerRepository = new AnswerRepository(answerDataSource, answerTransformer)
const commentRepository = new CommentRepository(commentDataSource, commentTransformer)

export const GetQuestions = new GetQuestionsUseCase(questionRepository)
export const GetUserQuestions = new GetUserQuestionsUseCase(questionRepository)
export const ListenToQuestion = new ListenToQuestionUseCase(questionRepository)
export const ListenToQuestions = new ListenToQuestionsUseCase(questionRepository)
export const ListenToUserQuestions = new ListenToUserQuestionsUseCase(questionRepository)
export const AddQuestion = new AddQuestionUseCase(questionRepository)
export const EditQuestion = new EditQuestionUseCase(questionRepository)
export const FindQuestion = new FindQuestionUseCase(questionRepository)
export const DeleteQuestion = new DeleteQuestionUseCase(questionRepository)
export const MarkBestAnswer = new MarkBestAnswerUseCase(questionRepository)

export const GetAnswers = new GetAnswersUseCase(answerRepository)
export const GetUserAnswers = new GetUserAnswersUseCase(answerRepository)
export const ListenToAnswers = new ListenToAnswersUseCase(answerRepository)
export const ListenToUserAnswers = new ListenToUserAnswersUseCase(answerRepository)
export const AddAnswer = new AddAnswerUseCase(answerRepository)
export const EditAnswer = new EditAnswerUseCase(answerRepository)
export const DeleteAnswer = new DeleteAnswerUseCase(answerRepository)
export const VoteAnswer = new VoteAnswerUseCase(answerRepository)

export const AddAnswerComment = new AddAnswerCommentUseCase(commentRepository)
export const GetAnswerComments = new GetAnswerCommentsUseCase(commentRepository)
export const ListenToAnswerComments = new ListenToAnswerCommentsUseCase(commentRepository)

export { QuestionEntity, QuestionFactory }
export { AnswerEntity, AnswerFactory }
export { CommentEntity, CommentFactory }
