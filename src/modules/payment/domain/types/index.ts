export enum Currencies {
	NGN = 'NGN'
}

export enum CurrencyCountries {
	NG = 'NG'
}

export enum TransactionStatus {
	initialized = 'initialized',
	fulfilled = 'fulfilled',
	failed = 'failed',
	settled = 'settled'
}

export enum TransactionType {
	NewCard = 'NewCard',
	Subscription = 'Subscription',
	BestAnswer = 'BestAnswer'
}

type TransactionNewCard = {
	type: TransactionType.NewCard
}

type TransactionSubscription = {
	type: TransactionType.Subscription
	subscriptionId: string
}

type TransactionBestAnswer = {
	type: TransactionType.BestAnswer
	answerId: string
	questionId: string
}

export type TransactionData = TransactionNewCard | TransactionSubscription | TransactionBestAnswer

export type SubscriptionModel = {
	active: boolean
	current: {
		id: string
		activatedAt: number
		expiredAt: number
		jobId: string
	} | null
	next: {
		id: string
		renewedAt: number
	} | null
	data: PlanData
}

export enum PlanDataType {
	questions = 'questions'
}

export type PlanData = Record<PlanDataType, number>

export type FlutterwaveSecrets = {
	publicKey: string
}

export type Bank = {
	id: number
	name: string
	code: string
}

export type AccountDetails = {
	country: CurrencyCountries
	number: string
	bankCode: string
	bankName: string
}

