<template>
	<div class="w-full flex flex-col py-3 px-2 ">
		<div class="flex flex-col text-sm text-dark_gray gap-3">
			<div class="flex flex-row justify-between items-center">
				<h2 class="text-dark_gray text-base font-bold ">Ranking</h2>
			</div>

			<div v-if="user" class="py-3 px-3 rounded-lg flex w-full bg-icon_inactive text-white flex-row items-center">
				<span class="font-semibold mr-2">-</span>
				<span>{{ user.bio.fullName }}</span>
				<div class="flex flex-row-reverse items-center flex-grow">
					<span class="font-semibold">{{ user.account.rankings[rankType] }}</span>
				</div>
			</div>

			<div class="flex flex-col items-center mt-3 text-sm text-dark_gray gap-2">
				<template v-if="users.length">
					<div v-for="(person, index) in users" :key="person.id"
						class="py-3 px-3 rounded-lg flex w-full bg-light_gray flex-row items-center">
						<span class="font-semibold mr-2">{{ index + 1 }}</span>
						<span>{{ person.bio.fullName }}</span>
						<div class="flex flex-row-reverse items-center flex-grow">
							<span class="text-primary font-semibold">{{ person.account.rankings[rankType] }}</span>
						</div>
					</div>
				</template>

				<router-link
					class="py-3 px-3 rounded-lg flex w-full bg-primary text-white justify-center flex-row items-center"
					to="/leaderboard">
					<span class="font-semibold">Leaderboard</span>
				</router-link>
			</div>

		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useLeaderboardList } from '@app/composable/users/leaderboard'

export default defineComponent({
	setup () {
		const { filteredUsers: users, loading, userIndex, rankType } = useLeaderboardList()
		const { user } = useAuth()

		return {
			user,
			rankType,
			users,
			loading,
			userIndex
		}
	}
})
</script>
