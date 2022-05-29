<template>
	<div class="flex flex-col items-center text-secondaryText gap-2">
		<router-link v-for="(person, index) in users" :key="person.id" :class="{'!bg-cyan': person.id === id}"
			:to="`/users/${person.id}`"
			class="py-3 px-3 rounded-xl flex w-full items-center bg-white"
		>
			<span :class="{'text-white !font-bold': person.id === id}" class="font-bold mr-2">{{ index + 1 }}</span>
			<span :class="{'text-white !font-bold': person.id === id}" class="flex items-center gap-1">
				<span>{{ person.bio.fullName }}</span>
				<Verified :verified="person.isVerified" />
			</span>
			<span :class="{'text-white': person.id === id}" class="text-primary font-bold ml-auto">
				{{ formatNumber(person.account.rankings[time], 2) }}
			</span>
		</router-link>

		<router-link v-if="user && hasNoAuthUser" :to="`/users/${user.id}`"
			class="py-3 px-3 rounded-lg flex w-full bg-cyan text-white font-bold flex-row items-center">
			<span class="font-bold mr-2">-</span>
			<span class="flex items-center gap-1">
				<span>{{ user.bio.fullName }}</span>
				<Verified :verified="user.isVerified" />
			</span>
			<span class="font-bold text-primary ml-auto">
				{{ formatNumber(user.account.rankings[time], 2) }}
			</span>
		</router-link>

		<EmptyState v-if="!loading && !error && !user && users.length === 0"
			info="No user has earned points this period." />

		<router-link class="w-full" to="/users/leaderboard">
			<IonButton class="btn-primary py-2 w-full">
				Leaderboard
			</IonButton>
		</router-link>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useLeaderboardList } from '@app/composable/users/leaderboard'
import { RankingTimes } from '@modules/users'
import { formatNumber } from '@utils/commons'

export default defineComponent({
	name: 'SideLeaderboardList',
	props: {
		time: {
			type: String as PropType<RankingTimes>,
			required: true
		}
	},
	setup (props) {
		const { users: allUsers, loading, error, hasNoAuthUser } = useLeaderboardList(props.time)
		const users = computed(() => allUsers.value.slice(0, 10))
		const { user, id } = useAuth()
		return { id, user, users, loading, error, hasNoAuthUser, formatNumber }
	}
})
</script>
