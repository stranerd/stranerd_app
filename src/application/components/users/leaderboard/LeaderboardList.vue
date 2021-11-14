<template>
	<div class="flex flex-col items-center justify-content-center gap-1 gap-md-2">
		<PageLoading v-if="loading" />

		<div class="flex flex-col gap-0-5 w-full">
			<div
				class="flex rounded-none lg:rounded-md bg-dark_gray font-bold normalText text-white py-4 lg:px-8 px-4 text-dark">
				<div class="w-3/12">
					<span>No.</span>
				</div>
				<div class="w-6/12">
					<span>Profile</span>
				</div>
				<div class="w-3/12 text-right">
					<span>Score</span>
				</div>
			</div>

			<template v-if="users.length">
				<div v-for="(person, index) in users" :key="person.id"
					:class="{'border border-faded_gray': person.id === id}"
					class="flex items-center mt-4 bg-light_gray rounded-none lg:rounded-md font-bold normalText text-dark_gray py-4 lg:px-8 px-4"
				>
					<div class="w-3/12">
						<span>{{ index + 1 }} </span>
					</div>
					<div class="w-3/12 flex items-center gap-2">
						<avatar :id="person.id" :size="24" :src="person.avatar" />
						<span>
							{{ person.bio.fullName }}
						</span>
					</div>
					<div class="w-6/12 font-normal text-right text-primary">
						<span>{{ person.account.rankings[time] }}</span>
					</div>
				</div>
			</template>

			<div v-if="user && !hasAuthUser"
				class="flex items-center mt-4 bg-light_gray rounded-none lg:rounded-md font-bold normalText text-dark_gray py-4 lg:px-8 px-4 border border-faded_gray">
				<div class="w-3/12">
					<span> - </span>
				</div>
				<div class="w-7/12 flex items-center gap-2">
					<avatar :id="user?.id" :size="24" :src="user.avatar" />
					<span>
						{{ user.bio.fullName }}
					</span>
				</div>
				<div class="w-2/12 text-right text-primary font-semibold">
					<span>{{ user.account.rankings[time] }}</span>
				</div>
			</div>
		</div>
		<!-- <div class="text-center text-18">
			<a class="text-primary-dark py-2" @click.prevent="fetchOlder">LOAD MORE</a>
		</div> -->
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useLeaderboardList } from '@app/composable/users/leaderboard'
import { RankingTimes } from '@modules/users'
import Avatar from '@app/components/core/Avatar.vue'
import PageLoading from '@app/components/core/PageLoading.vue'

export default defineComponent({
	name: 'LeaderboardList',
	props: {
		time: {
			type: String as PropType<RankingTimes>,
			required: true
		}
	},
	components: { Avatar, PageLoading },
	setup (props) {
		const { users, loading, hasAuthUser } = useLeaderboardList(props.time)
		const { user, id } = useAuth()

		return { user, id, users, loading, hasAuthUser }
	}
})
</script>
