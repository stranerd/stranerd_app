import { UserBio } from '../../domain/entities/user'


export interface ReviewToModel {
	review: string;
	rating: number;
	tutorId: string;
}
export interface ReviewFromModel extends ReviewToModel {
	id: string;
	userId: string;
	userBio: UserBio;
	createdAt: number;
	updatedAt: number;
}

