import { SubjectApiDataSource } from './data/datasources/subject-api'
import { QuestionApiDataSource } from './data/datasources/question-api'
import { AnswerApiDataSource } from './data/datasources/answer-api'
import { CommentApiDataSource } from './data/datasources/comment-api'
import { TagApiDataSource } from './data/datasources/tag-api'
import { SubjectTransformer } from './data/transformers/subject'
import { QuestionTransformer } from './data/transformers/question'
import { AnswerTransformer } from './data/transformers/answer'
import { CommentTransformer } from './data/transformers/comment'
import { TagTransformer } from './data/transformers/tag'
import { SubjectRepository } from './data/repositories/subject'
import { QuestionRepository } from './data/repositories/question'
import { AnswerRepository } from './data/repositories/answer'
import { CommentRepository } from './data/repositories/comment'
import { TagRepository } from './data/repositories/tag'
import { GetSubjectsUseCase } from './domain/usecases/subjects/getSubjects'
import { DeleteSubjectUseCase } from './domain/usecases/subjects/deleteSubject'
import { AddSubjectUseCase } from './domain/usecases/subjects/addSubject'
import { FindSubjectUseCase } from './domain/usecases/subjects/findSubject'
import { FindQuestionUseCase } from './domain/usecases/questions/findQuestion'
import { GetQuestionsUseCase } from './domain/usecases/questions/getQuestions'
import { GetSimilarQuestionsUseCase } from './domain/usecases/questions/getSimilarQuestions'
import { GetUserQuestionsUseCase } from './domain/usecases/questions/getUserQuestions'
import { ListenToUserQuestionsUseCase } from './domain/usecases/questions/listenToUserQuestions'
import { GetTagQuestionsUseCase } from './domain/usecases/questions/getTagQuestions'
import { ListenToTagQuestionsUseCase } from './domain/usecases/questions/listenToTagQuestions'
import { AddQuestionUseCase } from './domain/usecases/questions/addQuestion'
import { EditQuestionUseCase } from './domain/usecases/questions/editQuestion'
import { DeleteQuestionUseCase } from './domain/usecases/questions/deleteQuestion'
import { MarkBestAnswerUseCase } from './domain/usecases/questions/markBestAnswer'
import { ListenToQuestionUseCase } from './domain/usecases/questions/listenToQuestion'
import { ListenToQuestionsUseCase } from './domain/usecases/questions/listenToQuestions'
import { ListenToSimilarQuestionsUseCase } from './domain/usecases/questions/listenToSimilarQuestions'
import { GetAnswersUseCase } from './domain/usecases/answers/getAnswers'
import { GetUserAnswersUseCase } from './domain/usecases/answers/getUserAnswers'
import { ListenToUserAnswersUseCase } from './domain/usecases/answers/listenToUserAnswers'
import { AddAnswerUseCase } from './domain/usecases/answers/addAnswer'
import { EditAnswerUseCase } from './domain/usecases/answers/editAnswer'
import { DeleteAnswerUseCase } from './domain/usecases/answers/deleteAnswer'
import { ListenToAnswersUseCase } from './domain/usecases/answers/listenToAnswers'
import { VoteAnswerUseCase } from './domain/usecases/answers/voteAnswer'
import { AddAnswerCommentUseCase, AddQuestionCommentUseCase } from './domain/usecases/comments/addComment'
import { GetAnswerCommentsUseCase, GetQuestionCommentsUseCase } from './domain/usecases/comments/getComments'
import {
	ListenToAnswerCommentsUseCase,
	ListenToQuestionCommentsUseCase
} from './domain/usecases/comments/listenToComments'
import { GetTagsUseCase } from './domain/usecases/tags/getTags'
import { SubjectEntity } from './domain/entities/subject'
import { SubjectFactory } from './domain/factories/subject'
import { QuestionEntity } from './domain/entities/question'
import { QuestionFactory } from './domain/factories/question'
import { AnswerEntity } from './domain/entities/answer'
import { AnswerFactory } from './domain/factories/answer'
import { CommentEntity } from './domain/entities/comment'
import { CommentFactory } from './domain/factories/comment'
import { TagEntity } from './domain/entities/tag'

const subjectDataSource = new SubjectApiDataSource()
const questionDataSource = new QuestionApiDataSource()
const answerDataSource = new AnswerApiDataSource()
const questionCommentDataSource = new CommentApiDataSource('questionComments')
const answerCommentDataSource = new CommentApiDataSource('answerComments')
const tagDataSource = new TagApiDataSource()

const subjectTransformer = new SubjectTransformer()
const questionTransformer = new QuestionTransformer()
const answerTransformer = new AnswerTransformer()
const commentTransformer = new CommentTransformer()
const tagTransformer = new TagTransformer()

const subjectRepository = new SubjectRepository(subjectDataSource, subjectTransformer)
const questionRepository = new QuestionRepository(questionDataSource, questionTransformer)
const answerRepository = new AnswerRepository(answerDataSource, answerTransformer)
const questionCommentRepository = new CommentRepository(questionCommentDataSource, commentTransformer)
const answerCommentRepository = new CommentRepository(answerCommentDataSource, commentTransformer)
const tagRepository = new TagRepository(tagDataSource, tagTransformer)

export const GetSubjects = new GetSubjectsUseCase(subjectRepository)
export const DeleteSubject = new DeleteSubjectUseCase(subjectRepository)
export const AddSubject = new AddSubjectUseCase(subjectRepository)
export const FindSubject = new FindSubjectUseCase(subjectRepository)

export const GetQuestions = new GetQuestionsUseCase(questionRepository)
export const GetSimilarQuestions = new GetSimilarQuestionsUseCase(questionRepository)
export const GetUserQuestions = new GetUserQuestionsUseCase(questionRepository)
export const GetTagQuestions = new GetTagQuestionsUseCase(questionRepository)
export const ListenToQuestion = new ListenToQuestionUseCase(questionRepository)
export const ListenToQuestions = new ListenToQuestionsUseCase(questionRepository)
export const ListenToUserQuestions = new ListenToUserQuestionsUseCase(questionRepository)
export const ListenToTagQuestions = new ListenToTagQuestionsUseCase(questionRepository)
export const ListenToSimilarQuestions = new ListenToSimilarQuestionsUseCase(questionRepository)
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

export const AddQuestionComment = new AddQuestionCommentUseCase(questionCommentRepository)
export const AddAnswerComment = new AddAnswerCommentUseCase(answerCommentRepository)
export const GetQuestionComments = new GetQuestionCommentsUseCase(questionCommentRepository)
export const GetAnswerComments = new GetAnswerCommentsUseCase(answerCommentRepository)
export const ListenToQuestionComments = new ListenToQuestionCommentsUseCase(questionCommentRepository)
export const ListenToAnswerComments = new ListenToAnswerCommentsUseCase(answerCommentRepository)

export const GetTags = new GetTagsUseCase(tagRepository)

export { SubjectEntity, SubjectFactory }
export { QuestionEntity, QuestionFactory }
export { AnswerEntity, AnswerFactory }
export { CommentEntity, CommentFactory }
export { TagEntity }
