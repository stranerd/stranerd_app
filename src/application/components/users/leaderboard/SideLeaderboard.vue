<template>
	<div class="flex flex-col text-secondaryText gap-3">
		<div class="flex gap-4 w-full">
			<IonSelect v-model="time"
				class="capitalize !bg-bodyBg border border-itemBg border-2 w-1/3" interface="action-sheet">
				<IonSelectOption v-for="time in RankingTimes" :key="time" :value="time" class="capitalize">
					{{ time }} Ranking
				</IonSelectOption>
			</IonSelect>
			<IonSelect v-model="tagId"
				class="capitalize !bg-bodyBg border border-itemBg border-2 w-2/3" interface="action-sheet">
				<IonSelectOption :value="null" class="capitalize">All Departments</IonSelectOption>
				<IonSelectOption v-for="tag in departmentTags" :key="tag.hash" :value="tag.id" class="capitalize">
					{{ tag.title }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<div class="flex flex-col gap-2">
			<router-link v-for="(person) in users" :key="person.id"
				:to="`/users/${person.id}`"
				class="p-4 gap-3 rounded-lg flex w-full font-bold items-center"
			>
				<Avatar :name="person.bio.fullName" :size="32" :src="person.bio.photo" />
				<span class="flex items-center gap-1">
					<span>{{ person.bio.fullName }}</span>
					<Verified :verified="person.isVerified" />
				</span>
				<span class="font-bold ml-auto">
					{{ formatNumber(person.account.rankings[time], 2) }}
				</span>
			</router-link>

			<EmptyState v-if="!loading && !error && users.length === 0"
				info="No user has earned points this period." />

			<BlockLoading v-if="loading" />

			<IonButton v-if="nextPage > 1" class="btn-primary w-full" @click="fetchMoreUsers">
				Load More
			</IonButton>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLeaderboardList } from '@app/composable/users/leaderboard'
import { formatNumber } from '@utils/commons'
import { RankingTimes } from '@modules/users'
import { useTagList } from '@app/composable/interactions/tags'

export default defineComponent({
	name: 'SideLeaderboard',
	setup () {
		const { users, time, tagId, loading, error, nextPage, fetchMoreUsers } = useLeaderboardList()
		const { departmentTags } = useTagList()
		return {
			departmentTags, formatNumber, RankingTimes,
			users, loading, error, nextPage, fetchMoreUsers, time, tagId
		}
	}
})
</script>
