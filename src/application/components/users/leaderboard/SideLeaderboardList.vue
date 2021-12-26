<template>
	<div class="flex flex-col items-center text-sm text-main_dark gap-2">
		<div v-for="(person, index) in users" :key="person.id"
			:class="{'!bg-yellow_star': person.id === id}"
			class="py-3 px-3 rounded-xl flex w-full flex-row items-center bg-white"
		>
			<span class="font-bold text-sm mr-2">{{ index + 1 }}</span>
			<span class="text-base font-normal">{{ person.bio.fullName }}</span>
			<div class="flex flex-row-reverse items-center flex-grow">
				<span class="text-primary font-bold text-lg">{{ formatNumber(person.account.rankings[time], 2) }}</span>
			</div>
		</div>

		<div v-if="user && hasNoAuthUser"
			class="py-3 px-3 rounded-lg flex w-full bg-yellow_star text-main_dark font-bold flex-row items-center">
			<span class="font-bold mr-2 text-sm">-</span>
			<span class="text-base font-normal">{{ user.bio.fullName }}</span>
			<div class="flex flex-row-reverse items-center flex-grow">
				<span class="font-bold text-primary text-lg">{{ formatNumber(user.account.rankings[time], 2) }}</span>
			</div>
		</div>

		<router-link
			class="w-full"
			to="/users/leaderboard">
			<ion-button class="btn-primary w-full">
				Leaderboard
			</ion-button>
		</router-link>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType } from 'vue'
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
		const { users: allUsers, loading, hasNoAuthUser, listener } = useLeaderboardList(props.time)
		const users = computed(() => allUsers.value.slice(0, 10))
		const { user, id } = useAuth()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return { id, user, users, loading, hasNoAuthUser, formatNumber }
	}
})
</script>
