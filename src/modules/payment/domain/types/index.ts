export enum Currencies {
	NGN = 'NGN',
	USD = 'USD'
}

export enum TransactionStatus {
	initialized = 'initialized',
	fulfilled = 'fulfilled',
	failed = 'failed',
	settled = 'settled'
}

export enum TransactionType {
	NewCard = 'NewCard',
	Subscription = 'Subscription'
}

type TransactionNewCard = {
	type: TransactionType.NewCard
}

type TransactionSubscription = {
	type: TransactionType.Subscription
	subscriptionId: string
}

export type TransactionData = TransactionNewCard | TransactionSubscription

export type SubscriptionModel = {
	active: boolean
	current: {
		id: string
		activatedAt: number
		expiredAt: number
	} | null
	next: {
		id: string
		jobId: string
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
