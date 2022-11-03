export enum InteractionEntities {
	questions = 'questions',
	answers = 'answers',
	comments = 'comments'
}

export type InteractionEntity = {
	type: InteractionEntities
	id: string
}

export enum CommentMetaType {
	comments = 'comments'
}

export type CommentMeta = Record<CommentMetaType, number>

export enum TagTypes {
	questions = 'questions'
}
