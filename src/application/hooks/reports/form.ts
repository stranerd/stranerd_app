type Message = { id: string; body: string }

export const QuestionMessages = [
	{ id: '1', body: 'is incorrect or improper' },
	{ id: '2', body: 'is suspicious or spam' },
	{ id: '3', body: 'displays an insensitive image' },
	{ id: '4', body: 'is abusive or offensive' },
	{ id: '5', body: 'has links' },
	{ id: '6', body: 'contains advertisement' },
	{ id: '7', body: 'display personal information' },
	{ id: '8', body: 'is being used for malpractice' }
] as Message[]

export const AnswerMessages = [
	...QuestionMessages,
	{ id: '10', body: 'is a duplicate' }
]
