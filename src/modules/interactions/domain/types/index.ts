export enum InteractionEntities {
	questions = 'questions',
	answers = 'answers',
	comments = 'comments'
}

export type Interaction = {
	type: InteractionEntities
	userId: string
	id: string
}

export type InteractionEntity = Interaction & { userId: string }

export enum CommentMetaType {
	comments = 'comments'
}

export type CommentMeta = Record<CommentMetaType, number>

export enum TagTypes {
	questions = 'questions'
}
