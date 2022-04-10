import { IAnnouncementRepository } from '../../irepositories/iannouncement'

export class DeleteAnnouncementUseCase {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		this.repository = repository
	}

	async call (classId: string, id: string) {
		return await this.repository.delete(classId, id)
	}
}
