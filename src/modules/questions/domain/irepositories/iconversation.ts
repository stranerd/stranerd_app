export interface IConversationRepository {
	converse: (data: string[]) => Promise<string[]>
}
