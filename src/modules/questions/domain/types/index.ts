export enum AnswerMetaType {
	comments = 'comments',
	likes = 'likes',
	dislikes = 'dislikes'
}

export type AnswerMeta = Record<AnswerMetaType, number>
