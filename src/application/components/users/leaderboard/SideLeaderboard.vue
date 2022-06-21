<template>
	<div class="flex flex-col text-secondaryText gap-3 ">
		<div class="flex flex-col gap-4 justify-start items-center w-full">
			<IonSelect v-model="time" class="capitalize text-secondaryText text-base font-bold ion-transition ion-left-0 w-full h-10 rounded-lg"
				interface="action-sheet"
				placeholder="Daily">
				<IonSelectOption v-for="time in times" :key="time" :value="time" class="capitalize">
					{{ time }} Ranking
				</IonSelectOption>
			</IonSelect>
			<IonSelect v-model="time" class="capitalize text-secondaryText text-sm  ion-left-0 w-full h-10 rounded-lg"
				interface="action-sheet"
				placeholder="Daily">
				<IonSelectOption v-for="time in times" :key="time" :value="time" class="capitalize">
					Electrical & Electronics Engineering
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

<style scoped lang="scss">
	.ion-transition {
		background: $color-bodyBg !important;
		border: $border;
	}
	.ion-left-0 {
		--padding-start: 16px !important
	}

	ion-select::part(icon) {
		margin-left: 1rem;
		font-size: 14px;
	}
</style>
