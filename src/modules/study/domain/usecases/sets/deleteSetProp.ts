import { ISetRepository } from '../../irepositories/iset'
import { SetFromModel } from '../../../data/models/set'

export class DeleteSetPropUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (setId: string, type: keyof SetFromModel['saved'], values: string[]) {
		return await this.repository.deleteProp(setId, type, values)
	}
}
