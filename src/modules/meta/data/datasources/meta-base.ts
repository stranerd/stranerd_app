import { QueryResults } from '@modules/core'
import { QuestionFromModel } from '@modules/questions/data/models/question'
import { AnswerFromModel } from '@modules/questions/data/models/answer'
import { UserFromModel } from '@modules/users/data/models/user'

export interface MetaBaseDataSource {
	search: (searchParam: string) => Promise<{
		questions: QueryResults<QuestionFromModel>
		answers: QueryResults<AnswerFromModel>
		users: QueryResults<UserFromModel>
	}>
}
