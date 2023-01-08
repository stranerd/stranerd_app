<template>
	<div class="flex flex-col gap-4">
		<IonSelect v-model="time" class="capitalize" interface="action-sheet">
			<IonSelectOption v-for="time in RankingTimes" :key="time" :value="time" class="capitalize">
				{{ time }}
			</IonSelectOption>
		</IonSelect>

		<LeaderboardListCard v-for="(user, idx) in users" :key="user.id" :rank="idx + 1" :time="time" :user="user" />

		<EmptyState v-if="!loading && !error && users.length === 0" info="No user has earned points this period." />

		<BlockLoading v-if="loading" />

		<IonButton v-if="nextPage > 1" class="btn-primary w-full" @click="fetchMoreUsers">
			Load More
		</IonButton>
	</div>
</template>

<script lang="ts" setup>
import { useLeaderboardList } from '@app/composable/users/leaderboard'
import { RankingTimes } from '@modules/users'
import LeaderboardListCard from '@app/components/users/leaderboard/LeaderboardListCard.vue'

const { users, time, tagId, loading, error, nextPage, fetchMoreUsers } = useLeaderboardList()
</script>
