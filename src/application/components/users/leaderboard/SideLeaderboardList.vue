<template>
	<div class="flex flex-col items-center mt-3 text-sm text-main_dark gap-2">
		<template v-if="users.length">
			<div v-for="(person, index) in users" :key="person.id"
				:class="{'border-2 border-icon_inactive !bg-white': person.id === id}"
				class="py-3 px-3 rounded-xl flex w-full flex-row items-center bg-light_gray"
			>
				<span class="font-semibold mr-2">{{ index + 1 }}</span>
				<span>{{ person.bio.fullName }}</span>
				<div class="flex flex-row-reverse items-center flex-grow">
					<span class="text-primary font-semibold">{{ person.account.rankings[time] }}</span>
				</div>
			</div>
		</template>

		<div v-if="user && !hasAuthUser"
			class="py-3 px-3 rounded-lg flex w-full bg-icon_inactive text-white flex-row items-center">
			<span class="font-semibold mr-2">-</span>
			<span>{{ user.bio.fullName }}</span>
			<div class="flex flex-row-reverse items-center flex-grow">
				<span class="font-semibold">{{ user.account.rankings[time] }}</span>
			</div>
		</div>

		<router-link
			class="py-3 px-3 rounded-lg flex w-full bg-primary text-white justify-center flex-row items-center"
			to="/users/leaderboard">
			<span class="font-semibold">Leaderboard</span>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useLeaderboardList } from '@app/composable/users/leaderboard'
import { RankingTimes } from '@modules/users'

export default defineComponent({
	name: 'SideLeaderboardList',
	props: {
		time: {
			type: String as PropType<RankingTimes>,
			required: true
		}
	},
	setup (props) {
		const { users, loading, hasAuthUser, listener } = useLeaderboardList(props.time)
		const { user, id } = useAuth()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return { id, user, users, loading, hasAuthUser }
	}
})
</script>
