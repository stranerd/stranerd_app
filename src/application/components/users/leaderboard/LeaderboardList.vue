<template>
	<div class="flex flex-col items-center justify-content-center gap-1 gap-md-2">
		<PageLoading v-if="loading" />

		<div class="flex flex-col gap-0-5 w-full mt-6 md:mt-0">
			<div
				class="flex  rounded-xl bg-gray font-bold lg:text-base text-xs text-white py-4 lg:px-8 px-4 mx-5 text-dark">
				<div class="lg:w-1/12 w-2/12">
					<span>Rank</span>
				</div>
				<div class="w-8/12">
				</div>
				<div class="w-3/12 text-right">
					<span>Nerd Score</span>
				</div>
			</div>

			<template v-if="users.length">
				<div v-for="(person, index) in users" :key="person.id"
					:class="{'bg-yellow_star': person.id === id}"
					class="flex items-center mt-4 bg-white  rounded-xl font-bold lg:text-base text-xs text-main_dark py-4 lg:px-8 px-4 mx-5"
				>
					<div class="lg:w-1/12 w-2/12">
						<span>{{ index + 1 }} </span>
					</div>
					<div class="w-8/12 flex items-center gap-2">
						<avatar :id="person.id" :size="24" :src="person.avatar" />
						<span>
							{{ person.bio.fullName }}
						</span>
						<Tag :tag="person.rank.id"   :secondary="true"/>

					</div>
					<div class="w-3/12 font-bold text-right text-primary">
						<span>{{ person.account.rankings[time] }}</span>
					</div>
				</div>
			</template>

			<div v-if="user && !hasAuthUser"
				class="flex items-center mt-4 bg-white rounded-xl font-bold lg:text-base text-xs text-main_dark py-4 lg:px-8 px-4 mx-5 bg-yellow_star ">
				<div class="lg:w-1/12 w-2/12">
					<span> - </span>
				</div>
				<div class="w-8/12 flex items-center gap-2">
					<avatar :id="user?.id" :size="24" :src="user.avatar" />
					<span>
						{{ user.bio.fullName }}
					</span>
					<Tag :tag="user.rank.id" :secondary="true"/>
				</div>
				<div class="w-3/12 text-right text-primary font-bold">
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
import { defineComponent, onBeforeUnmount, onMounted, PropType } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useLeaderboardList } from '@app/composable/users/leaderboard'
import { RankingTimes } from '@modules/users'
import Avatar from '@app/components/core/Avatar.vue'
import PageLoading from '@app/components/core/PageLoading.vue'
import Tag from '../../questions/tags/Tag.vue'

export default defineComponent({
	name: 'LeaderboardList',
	components: { Avatar, PageLoading, Tag },
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

		return { user, id, users, loading, hasAuthUser }
	}
})
</script>
