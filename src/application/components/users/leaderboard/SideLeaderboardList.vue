<template>
	<div class="flex flex-col items-center text-sm text-main_dark gap-2">
		<router-link v-for="(person, index) in users" :key="person.id" :class="{'!bg-cyan': person.id === id}"
			:to="`/users/${person.id}`"
			class="py-3 px-3 rounded-xl flex w-full flex-row items-center bg-white"
		>
			<span class="font-bold text-sm mr-2"  :class="{'text-white !font-bold': person.id === id}">{{ index + 1 }}</span>
			<span class="text-base font-normal flex items-center gap-1" :class="{'text-white !font-bold': person.id === id}">
				<span>{{ person.bio.fullName }}</span>
				<IonIcon v-if="person.isVerified" :icon="checkmarkCircleOutline" color="primary" />
			</span>
			<span class="text-primary font-bold text-lg ml-auto"  :class="{'text-white !font-bold': person.id === id}">
				{{ formatNumber(person.account.rankings[time], 2) }}
			</span>
		</router-link>

		<router-link v-if="user && hasNoAuthUser" :to="`/users/${user.id}`"
			class="py-3 px-3 rounded-lg flex w-full bg-cyan text-main_dark font-bold flex-row items-center">
			<span class="font-bold mr-2 text-sm">-</span>
			<span class="text-base font-normal flex items-center gap-1"  :class="{'text-white !font-bold': user.id === id}">
				<span>{{ user.bio.fullName }}</span>
				<IonIcon v-if="user.isVerified" :icon="checkmarkCircleOutline" color="primary" />
			</span>
			<span class="font-bold text-primary text-lg ml-auto"  :class="{'text-white !font-bold': user.id === id}">
				{{ formatNumber(user.account.rankings[time], 2) }}
			</span>
		</router-link>

		<EmptyState v-if="!loading && !error && !user && users.length === 0"
			info="No user has earned points this period." />

		<router-link class="w-full" to="/users/leaderboard">
			<ion-button class="btn-primary py-2 w-full">
				Leaderboard
			</ion-button>
		</router-link>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useLeaderboardList } from '@app/composable/users/leaderboard'
import { RankingTimes } from '@modules/users'
import { formatNumber } from '@utils/commons'
import { checkmarkCircleOutline } from 'ionicons/icons'

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
		return { id, user, users, loading, error, hasNoAuthUser, formatNumber, checkmarkCircleOutline }
	}
})
</script>
