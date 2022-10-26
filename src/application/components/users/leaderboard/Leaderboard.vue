<template>
	<div class="flex flex-col gap-4">
		<div class="flex w-full">
			<IonSelect v-model="time"
				class="capitalize w-2/5" interface="action-sheet">
				<IonSelectOption v-for="time in RankingTimes" :key="time" :value="time" class="capitalize">
					{{ time }}
				</IonSelectOption>
			</IonSelect>
			<IonSelect v-model="tagId" class="capitalize w-3/5"
				interface="action-sheet">
				<IonSelectOption :value="null" class="capitalize">All Departments</IonSelectOption>
				<IonSelectOption v-for="tag in departmentTags" :key="tag.hash" :value="tag.id" class="capitalize">
					{{ tag.title }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<LeaderboardListCard v-for="(user, idx) in users" :key="user.id" :rank="idx + 1" :time="time" :user="user" />

		<EmptyState v-if="!loading && !error && users.length === 0" info="No user has earned points this period." />

		<BlockLoading v-if="loading" />

		<IonButton v-if="nextPage > 1" class="btn-primary w-full" @click="fetchMoreUsers">
			Load More
		</IonButton>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLeaderboardList } from '@app/composable/users/leaderboard'
import { RankingTimes } from '@modules/users'
import { useTagList } from '@app/composable/interactions/tags'
import LeaderboardListCard from '@app/components/users/leaderboard/LeaderboardListCard.vue'

export default defineComponent({
	name: 'Leaderboard',
	components: { LeaderboardListCard },
	setup () {
		const { users, time, tagId, loading, error, nextPage, fetchMoreUsers } = useLeaderboardList()
		const { departmentTags } = useTagList()
		return {
			departmentTags, RankingTimes,
			users, loading, error, nextPage, fetchMoreUsers, time, tagId
		}
	}
})
</script>
