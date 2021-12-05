import { TestData } from '../../domain/entities/test'

export interface TestFromModel extends Omit<TestToModel, 'type'> {
	id: string
	questions: string[]
	answers: Record<string, number>
	score: number
	userId: string
	done: boolean
	createdAt: number
	updatedAt: number
}

export interface TestToModel {
	name: string
	prepId: string
	data: TestData
}
