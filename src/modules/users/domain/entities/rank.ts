export enum RankTypes {
	Rookie = 'Rookie',
	Comrade = 'Comrade',
	Scholar = 'Scholar',
	Wizard = 'Wizard',
	Einstein = 'Einstein'
}

type Rank = {
	id: RankTypes
	level: number
	score: number
	image: string
}

export const Ranks: Record<RankTypes, Rank> = {
	[RankTypes.Rookie]: {
		id: RankTypes.Rookie,
		level: 1,
		score: 100,
		image: '/images/ranking/rookie.svg'
	},
	[RankTypes.Comrade]: {
		id: RankTypes.Comrade,
		level: 2,
		score: 250,
		image: '/images/ranking/comrade.svg'
	},
	[RankTypes.Scholar]: {
		id: RankTypes.Scholar,
		level: 3,
		score: 450,
		image: '/images/ranking/scholar.svg'
	},
	[RankTypes.Wizard]: {
		id: RankTypes.Wizard,
		level: 4,
		score: 700,
		image: '/images/ranking/wizard.svg'
	},
	[RankTypes.Einstein]: {
		id: RankTypes.Einstein,
		level: 5,
		score: Number.POSITIVE_INFINITY,
		image: '/images/ranking/einstein.svg'
	}
}

export const getRankImage = (rank: RankTypes) => Ranks[rank].image
