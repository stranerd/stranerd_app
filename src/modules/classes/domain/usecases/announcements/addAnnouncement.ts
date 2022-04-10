import { IAnnouncementRepository } from '../../irepositories/iannouncement'
import { AnnouncementFactory } from '../../factories/announcement'

export class AddAnnouncementUseCase {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		this.repository = repository
	}

	async call (factory: AnnouncementFactory) {
		const data = await factory.toModel()
		return await this.repository.add(data.classId, data)
	}
}
