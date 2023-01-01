export interface ConversationBaseDataSource {
	converse: (data: string[]) => Promise<string[]>
}
