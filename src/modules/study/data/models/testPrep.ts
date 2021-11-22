import { PrepData } from '../../domain/entities/testPrep'

export interface TestPrepFromModel extends TestPrepToModel {
	id: string
	createdAt: number
	updatedAt: number
}

export interface TestPrepToModel {
	name: string
	data: PrepData
	questions: number
	time: number
}
