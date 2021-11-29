<template>
	<div>
		<div class="flex justify-center items-center">
			<span class="font-bold text-main_dark heading hidden md:block">
				Leaderboard
			</span>
			<div class="flex gap-4 md:ml-auto">
				<IonSelect v-model="time"
					class="max-w-[138px] text-xs md:text-sm  placeholder-[#8B9EB1] font-bold capitalize"
					interface="action-sheet" placeholder="Daily">
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
import { IonSelect, IonSelectOption } from '@ionic/vue'
import LeaderboardList from '@app/components/users/leaderboard/LeaderboardList.vue'
import { time, times } from '@app/composable/users/leaderboard'

export default defineComponent({
	name: 'Leaderboard',
	components: { LeaderboardList, IonSelect, IonSelectOption },
	setup () {
		return { times, time }
	}
})
</script>


<style lang="scss" scoped>
	ion-select {
		--placeholder-color: #8B9EB1;
		--placeholder-opacity: 1;
		background-color: #F7F7FC;
		--color: #8B9EB1;
		--padding-end: 1rem;
		--padding-top: 0.5rem !important;
		--padding-bottom: 0.5rem !important;
		border-radius: 6px;
	}
</style>
