export enum RankTypes {
	Rookie = 'Rookie',
	Comrade = 'Comrade',
	Scholar = 'Scholar',
	Wizard = 'Wizard',
	Einstein = 'Einstein'
}

export const RankImages: Record<RankTypes, string> = {
	[RankTypes.Rookie]: '/images/ranking/rookie.svg',
	[RankTypes.Comrade]: '/images/ranking/comrade.svg',
	[RankTypes.Scholar]: '/images/ranking/scholar.svg',
	[RankTypes.Wizard]: '/images/ranking/wizard.svg',
	[RankTypes.Einstein]: '/images/ranking/einstein.svg'
}

export const getRankImage = (rank: RankTypes) => RankImages[rank]
