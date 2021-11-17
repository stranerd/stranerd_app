import { QueryResults } from '@modules/core'
import { AnswerEntity, QuestionEntity } from '@modules/questions'
import { UserEntity } from '@modules/users'

export abstract class IMetaRepository {
	abstract search: (searchParam: string) => Promise<{
		questions: QueryResults<QuestionEntity>
		answers: QueryResults<AnswerEntity>
		users: QueryResults<UserEntity>
	}>
}
