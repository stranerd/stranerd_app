<template>
	<div>
		<div v-if="user && !hasAuthUser"
			class="py-3 px-3 rounded-lg flex w-full bg-icon_inactive text-white flex-row items-center">
			<span class="font-semibold mr-2">-</span>
			<span>{{ user.bio.fullName }}</span>
			<div class="flex flex-row-reverse items-center flex-grow">
				<span class="font-semibold">{{ user.account.rankings[time] }}</span>
			</div>
		</div>

		<div class="flex flex-col items-center mt-3 text-sm text-dark_gray gap-2">
			<template v-if="users.length">
				<div v-for="(person, index) in users" :key="person.id"
					:class="{'border border-faded_gray': person.id === id}"
					class="py-3 px-3 rounded-lg flex w-full flex-row items-center bg-light_gray"
				>
					<span class="font-semibold mr-2">{{ index + 1 }}</span>
					<span>{{ person.bio.fullName }}</span>
					<div class="flex flex-row-reverse items-center flex-grow">
						<span class="text-primary font-semibold">{{ person.account.rankings[time] }}</span>
					</div>
				</div>
			</template>

			<router-link
				class="py-3 px-3 rounded-lg flex w-full bg-primary text-white justify-center flex-row items-center"
				to="/users/leaderboard">
				<span class="font-semibold">Leaderboard</span>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
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
		const { users, loading, hasAuthUser } = useLeaderboardList(props.time)
		const { user, id } = useAuth()

		return { id, user, users, loading, hasAuthUser }
	}
})
</script>
