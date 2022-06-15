export enum InteractionEntities {
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
