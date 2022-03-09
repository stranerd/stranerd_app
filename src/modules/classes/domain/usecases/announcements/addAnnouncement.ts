import { IAnnouncementRepository } from '../../irepositories/iannouncement'
import { AnnouncementFactory } from '../../factories/announcement'

export class AddAnnouncementUseCase {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		this.repository = repository
	}

	async call (factory: AnnouncementFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
