<template>
	<div v-if="user">
		<div
			class="flex flex-col flex-md-row d-lg-none justify-content-center align-items-center gap-1-5 px-1 py-1-5"
		>
			<div class="col-md-6 flex flex-col gap-1 align-items-center">
				<Heading class="color-dark" no-grow variant="2">
					<DynamicText>
						{{ user.id === id ? 'My Rank' : user.firstName + '\'s Badge' }}
					</DynamicText>
				</Heading>
				<img :src="user.rankImage" alt="" class="img-rank">
			</div>
			<div class="border border-line align-self-stretch w-75 mx-auto" style="border-width: 1px !important;" />
			<div class="col-md-6 flex flex-col gap-1 align-items-center">
				<Heading class="color-dark" no-grow variant="2">
					<DynamicText>
						{{ user.id === id ? 'My' : user.firstName + '\'s' }} Nerd Score
					</DynamicText>
				</Heading>
				<template v-if="user.id === id">
					<DonutChart :score="user.score" :size="120" :total="user.expectedScore" />
					<span class="text-18 text-dark text-center">
						{{ user.nerdScoreMessage }}
					</span>
				</template>
				<span v-else class="score"><DynamicText>{{ user.formattedScore }}</DynamicText></span>
			</div>
		</div>
		<div class="d-none d-lg-flex flex-col gap-2-25">
			<template v-if="user.id === id">
				<ProfileHeadCard :user="user" class="balance" />
				<div class="flex flex-col gap-1 ranking">
					<Heading class="text-center color-dark" no-grow varaint="2">
						Ranking Up
					</Heading>
					<div class="flex gap-1 align-items-center text-dark">
						<img :src="user.rankImage" alt="" class="img-rank-2">
						<ProgressBar :current="user.rankProgress" :primary="true" />
						<img
							v-if="user.nextRank"
							:src="user.nextRankImage"
							alt=""
							class="img-rank-2"
						>
					</div>
				</div>
			</template>
			<div v-else class="flex flex-col gap-1 ranking">
				<div class="flex flex-col gap-1 align-items-center text-blue">
					<Heading class="color-dark" no-grow variant="2">
						<DynamicText>
							{{ user.id === id ? 'My Rank' : user.firstName + '\'s Badge' }}
						</DynamicText>
					</Heading>
					<img :src="user.rankImage" alt="" class="img-rank">
				</div>
			</div>
			<div class="flex flex-col gap-1 align-items-center ranking">
				<Heading class="color-dark" no-grow variant="2">
					<DynamicText>
						{{ user.id === id ? 'My' : user.firstName + '\'s' }} Nerd Score
					</DynamicText>
				</Heading>
				<template v-if="user.id === id">
					<DonutChart :score="user.score" :size="120" :total="user.expectedScore" />
					<span class="text-18 text-dark text-center">
						{{ user.nerdScoreMessage }}
					</span>
				</template>
				<span v-else class="score"><DynamicText>{{ user.formattedScore }}</DynamicText></span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from 'vue'
import { useUser } from '@app/hooks/users/user'
import ProfileHeadCard from '@app/components/users/account/ProfileHeadCard.vue'
import { useAuth } from '@app/hooks/auth/auth'

export default defineComponent({
	name: 'ProfileRightSidebar',
	components: { ProfileHeadCard },
	setup () {
		const { id } = useAuth()
		const { userId } = useRoute().value.params
		const { error, loading, user } = useUser(userId)
		return { error, loading, user, id }
	}
})
</script>

<style lang="scss" scoped>
	.balance {
		background: $color-white;
		border: 0.5px solid $color-line;
		width: -webkit-fill-available;
		box-shadow: 0 5px 10px rgba(19, 39, 64, 0.047);
	}

	.ranking {
		background: $color-tags;
		border-radius: 6px;
		border: 0.5px solid $color-line;
		padding: 36px;
	}

	.img-rank {
		width: 7.5rem;
	}

	.img-rank-2 {
		width: 3.875rem;
	}

	.stat {
		width: 350px;
		font-size: 14px;
		font-weight: 600;
		color: $color-sub;
	}

	.score {
		font-size: 2rem !important;
		font-weight: 700;
		width: 7.5rem;
		height: 7.5rem;
		border-radius: 10rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: $color-primary;
		color: $color-white;
	}
</style>
