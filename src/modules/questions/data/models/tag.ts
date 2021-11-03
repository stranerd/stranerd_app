export interface TagToModel {
	name: string;
}
export interface TagFromModel extends TagToModel {
	id: string;
	count: number;
	createdAt: number;
	updatedAt: number;
}


