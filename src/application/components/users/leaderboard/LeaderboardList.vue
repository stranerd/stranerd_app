<template>
	<div class="flex flex-col lg:gap-4 w-full lg:text-base text-xs font-bold lg:py-4">
		<PageLoading v-if="loading" />
		<div
			class="flex lg:rounded-xl bg-gray text-white py-4 px-4">
			<div class="md:w-1/12 w-2/12">
				<span>Rank</span>
			</div>
			<div class="w-8/12" />
			<div class="w-3/12 text-right">
				<span>Nerd Score</span>
			</div>
		</div>

		<router-link v-for="(person, index) in users" :key="person.hash"
			:class="{'!bg-cyan !text-white': person.id === id}"
			:to="`/users/${person.id}`"
			class="flex items-center bg-white lg:rounded-xl text-main_dark p-4"
		>
			<div class="md:w-1/12 w-2/12">
				<span>{{ index + 1 }} </span>
			</div>
			<div class="w-8/12 flex items-center gap-2">
				<avatar :id="person.id" :name="person.bio.fullName" :size="24" :src="person.avatar" />
				<span class="flex items-center gap-1">
					<span>{{ person.bio.fullName }}</span>
					<IonIcon v-if="person.isVerified" :icon="checkmarkCircleOutline" color="primary" />
				</span>
				<Tag :index="person.rank.level - 1" :secondary="true" :tag="person.rank.id" />
			</div>
			<div class="w-3/12 font-bold text-right">
				<span>{{ formatNumber(person.account.rankings[time], 2) }}</span>
			</div>
		</router-link>

		<router-link v-if="user && hasNoAuthUser" :to="`/users/${user.id}`"
			class="flex items-center lg:rounded-xl text-white p-4 bg-cyan">
			<div class="md:w-1/12 w-2/12">
				<span> - </span>
			</div>
			<div class="w-8/12 flex items-center gap-2">
				<avatar :id="user?.id" :name="user.bio.fullName" :size="24" :src="user.avatar" />
				<span class="flex items-center gap-1">
					<span>{{ user.bio.fullName }}</span>
					<IonIcon v-if="user.isVerified" :icon="checkmarkCircleOutline" color="primary" />
				</span>
				<Tag :index="user.rank.level - 1" :secondary="true" :tag="user.rank.id" />
			</div>
			<div class="w-3/12 text-right font-bold">
				<span>{{ formatNumber(user.account.rankings[time], 2) }}</span>
			</div>
		</router-link>

		<EmptyState v-if="!loading && !error && !user && users.length === 0"
			info="No user has earned points this period." />
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
import { checkmarkCircleOutline } from 'ionicons/icons'

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
		return { user, id, users, error, loading, hasNoAuthUser, formatNumber, checkmarkCircleOutline }
	}
})
</script>
