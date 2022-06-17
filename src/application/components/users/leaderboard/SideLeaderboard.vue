<template>
	<div class="flex flex-col text-secondaryText gap-3">
		<div class="flex flex-row justify-start items-center">
			<IonSelect v-model="time" class="capitalize text-secondaryText text-xl font-bold ion-left-0"
				interface="action-sheet"
				placeholder="Daily">
				<IonSelectOption v-for="time in times" :key="time" :value="time" class="capitalize">
					{{ time }} Ranking
				</IonSelectOption>
			</IonSelect>
		</div>

		<SideLeaderboardList :key="time" :time="time" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideLeaderboardList from '@app/components/users/leaderboard/SideLeaderboardList.vue'
import { time, times } from '@app/composable/users/leaderboard'

export default defineComponent({
	name: 'SideLeaderboard',
	components: { SideLeaderboardList },
	setup () {
		return { times, time }
	}
})
</script>

<style scoped>
	.ion-left-0 {
		--padding-start: 0px !important
	}

	ion-select::part(icon) {
		margin-left: 1rem;
		font-size: 14px;
	}
</style>
