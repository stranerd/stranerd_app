<template>
	<div class="flex flex-col items-center justify-content-center gap-1 gap-md-2">
		<PageLoading v-if="loading" />

		<div class="flex flex-col gap-0-5 w-full mt-6 md:mt-0 px-4">
			<div
				class="flex rounded-xl bg-gray font-bold lg:text-base text-xs text-white py-4 px-4 text-dark">
				<div class="lg:w-1/12 w-2/12">
					<span>Rank</span>
				</div>
				<div class="w-8/12">
				</div>
				<div class="w-3/12 text-right">
					<span>Nerd Score</span>
				</div>
			</div>

			<div v-for="(person, index) in users" :key="person.hash"
				:class="{'bg-yellow_star': person.id === id}"
				class="flex items-center mt-4 bg-white rounded-xl font-bold lg:text-base text-xs text-main_dark py-4 px-4"
			>
				<div class="lg:w-1/12 w-2/12">
					<span>{{ index + 1 }} </span>
				</div>
				<div class="w-8/12 flex items-center gap-2">
					<avatar :id="person.id" :size="24" :src="person.avatar" />
					<span>{{ person.bio.fullName }}</span>
					<Tag :index="person.rank.level - 1" :secondary="true" :tag="person.rank.id" />
				</div>
				<div class="w-3/12 font-bold text-right text-primary">
					<span>{{ formatNumber(person.account.rankings[time], 2) }}</span>
				</div>
			</div>

			<div v-if="user && hasNoAuthUser"
				class="flex items-center mt-4 bg-white rounded-xl font-bold lg:text-base text-xs text-main_dark py-4 px-4 bg-yellow_star">
				<div class="lg:w-1/12 w-2/12">
					<span> - </span>
				</div>
				<div class="w-8/12 flex items-center gap-2">
					<avatar :id="user?.id" :size="24" :src="user.avatar" />
					<span>{{ user.bio.fullName }}</span>
					<Tag :index="user.rank.level - 1" :secondary="true" :tag="user.rank.id" />
				</div>
				<div class="w-3/12 text-right text-primary font-bold">
					<span>{{ formatNumber(user.account.rankings[time], 2) }}</span>
				</div>
			</div>

			<EmptyState v-if="!loading && !error && !user && users.length === 0" class="mt-4"
				info="No user has earned points this period." />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useLeaderboardList } from '@app/composable/users/leaderboard'
import { RankingTimes } from '@modules/users'
import Avatar from '@app/components/core/Avatar.vue'
import PageLoading from '@app/components/core/PageLoading.vue'
import { formatNumber } from '@utils/commons'

export default defineComponent({
	name: 'LeaderboardList',
	components: { Avatar, PageLoading },
	props: {
		time: {
			type: String as PropType<RankingTimes>,
			required: true
		}
	},

	setup (props) {
		const { users, error, loading, hasNoAuthUser } = useLeaderboardList(props.time)
		const { user, id } = useAuth()
		return { user, id, users, error, loading, hasNoAuthUser, formatNumber }
	}
})
</script>
