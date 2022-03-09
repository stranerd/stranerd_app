import { IAnnouncementRepository } from '../../irepositories/iannouncement'
import { AnnouncementFactory } from '../../factories/announcement'

export class UpdateAnnouncementUseCase {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		this.repository = repository
	}

	async call (id: string, factory: AnnouncementFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
