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

	async buyCoinsWithStripe (data: { amount: number; currency: string; gold: number; bronze: number }) {
		return this.stranerdClient.post<any, { id: string, clientSecret: string }>('/payment/stripe/coins', data)
	}

	async verifyStripePayment (data: { intentId: string }) {
		return this.stranerdClient.post<any, boolean>('/payment/stripe/verify', data)
	}
}
