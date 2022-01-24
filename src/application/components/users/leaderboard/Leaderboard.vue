<template>
	<div>
		<div class="bg-primary w-full md:p-6 p-6 mb-6 rounded-b-xl md:rounded-none ">

			<div class="flex flex-col md:flex-row justify-center items-center w-full md:max-w-4xl md:mx-auto px-6">
				<span class="font-bold text-white text-3xl hidden md:block">
					Leaderboard
				</span>
				<div class="flex gap-4 md:ml-auto -mb-11 md:mb-0 md:w-auto w-full">
					<IonSelect v-model="time"
						class="md:w-[138px] py-4 md:py-3 px-5 md:px-4 w-full text-xs md:text-base placeholder-[#8B9EB1] font-bold capitalize"
						interface="action-sheet"
						placeholder="Daily">
						<IonSelectOption v-for="time in times" :key="time" :value="time" class="capitalize">
							{{ time }}
						</IonSelectOption>
					</IonSelect>
				</div>
			</div>
		</div>
		<LeaderboardList :key="time" :time="time" class="max-w-4xl mx-auto" />
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
		background-color: #fff !important;
		--color: #8B9EB1;
		--padding-end: 1rem;
		--padding-top: 0.5rem !important;
		--padding-bottom: 0.5rem !important;
		border-radius: 12px;
	}
</style>
