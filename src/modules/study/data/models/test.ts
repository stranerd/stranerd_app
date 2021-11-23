import { TestData, TestType } from '../../domain/entities/test'

export interface TestFromModel extends Omit<TestToModel, 'type'> {
	id: string
	data: TestData
	questions: string[]
	answers: Record<string, number>
	score: number
	userId: string
	done: boolean
	createdAt: number
	updatedAt: number
}

export interface TestToModel {
	prepId: string
	type: TestType
}
