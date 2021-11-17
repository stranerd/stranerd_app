import { HttpClient, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { QuestionFromModel } from '@modules/questions/data/models/question'
import { AnswerFromModel } from '@modules/questions/data/models/answer'
import { UserFromModel } from '@modules/users/data/models/user'
import { MetaBaseDataSource } from './meta-base'

export class MetaApiDataSource implements MetaBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD)
	}

	async search (search: string) {
		return this.stranerdClient.get<{}, {
			questions: QueryResults<QuestionFromModel>
			answers: QueryResults<AnswerFromModel>
			users: QueryResults<UserFromModel>
		}>(`/meta/search/${search}`, {})
	}
}
