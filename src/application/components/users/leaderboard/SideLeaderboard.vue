<template>
	<div class="flex flex-col text-secondaryText gap-3">
		<div class="flex gap-4 w-full">
			<IonSelect v-model="time"
				class="capitalize !bg-bodyBg border border-itemBg border-2 w-2/5" interface="action-sheet">
				<IonSelectOption v-for="time in RankingTimes" :key="time" :value="time" class="capitalize">
					{{ time }} Ranking
				</IonSelectOption>
			</IonSelect>
			<IonSelect v-model="tagId"
				class="capitalize !bg-bodyBg border border-itemBg border-2 w-3/5" interface="action-sheet">
				<IonSelectOption :value="null" class="capitalize">All Departments</IonSelectOption>
				<IonSelectOption v-for="tag in departmentTags" :key="tag.hash" :value="tag.id" class="capitalize">
					{{ tag.title }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<div class="flex flex-col gap-6">
			<router-link v-for="(person) in users" :key="person.id"
				:to="`/users/${person.id}`"
				class="gap-3 flex w-full font-bold items-center"
			>
				<Avatar :name="person.bio.fullName" :size="32" :src="person.bio.photo" />
				<UserName :name="person.bio.fullName" :isTutor="person.roles.isStranerdTutor" />
				<span class="font-bold ml-auto">
					{{
						formatNumber(person.account.rankings[time], 2)
					}} {{ pluralize(person.account.rankings[time], 'pt', 'pts') }}
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
import { formatNumber, pluralize } from '@utils/commons'
import { RankingTimes } from '@modules/users'
import { useTagList } from '@app/composable/interactions/tags'

export default defineComponent({
	name: 'SideLeaderboard',
	setup () {
		const { users, time, tagId, loading, error, nextPage, fetchMoreUsers } = useLeaderboardList()
		const { departmentTags } = useTagList()
		return {
			departmentTags, formatNumber, RankingTimes, pluralize,
			users, loading, error, nextPage, fetchMoreUsers, time, tagId
		}
	}
})
</script>
