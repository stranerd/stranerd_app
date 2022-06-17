<template>
	<div class="h-full md:bg-new_gray w-full lg:w-8/12 mx-auto lg:mt-6">
		<div class="bg-white md:rounded-xl flex items-center justify-between gap-2 md:px-4 lg:p-4">
			<IonText class="text-secondaryText leading-tight text-xl font-bold hidden md:inline">
				Leaderboard
			</IonText>
			<div class="w-full md:w-auto border-bottom-line">
				<IonSelect v-model="time"
					class="md:w-[138px] md:bg-new_gray p-4 w-full text-sm placeholder-[#8B9EB1] font-bold capitalize"
					interface="action-sheet"
					placeholder="Daily">
					<IonSelectOption v-for="time in times" :key="time" :value="time" class="capitalize">
						{{ time }}
					</IonSelectOption>
				</IonSelect>
			</div>
		</div>
		<LeaderboardList :key="time" :time="time" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LeaderboardList from '@app/components/users/leaderboard/LeaderboardList.vue'
import { time, times } from '@app/composable/users/leaderboard'

export default defineComponent({
	name: 'Leaderboard',
	components: { LeaderboardList },
	setup () {
		return { times, time }
	}
})
</script>

<style lang="scss" scoped>
	ion-select {
		--placeholder-color: #{$color-iconInactive};
		--placeholder-opacity: 1;
		background-color: #fff !important;
		--color: #{$color-iconInactive};
		--padding-end: 1rem;
		--padding-top: 0.5rem !important;
		--padding-bottom: 0.5rem !important;
		border-radius: 12px;
	}
</style>
