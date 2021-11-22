<template>
	<div class="flex flex-col text-sm text-main_dark gap-3">
		<div class="flex flex-row justify-between items-center">
			<h2 class="text-main_dark text-base font-bold">Ranking</h2>
			<IonSelect v-model="time" class="capitalize" interface="action-sheet" placeholder="Daily">
				<IonSelectOption v-for="time in times" :key="time" :value="time" class="capitalize">
					{{ time }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<SideLeaderboardList :key="time" :time="time" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonSelect, IonSelectOption } from '@ionic/vue'
import SideLeaderboardList from '@app/components/users/leaderboard/SideLeaderboardList.vue'
import { time, times } from '@app/composable/users/leaderboard'

export default defineComponent({
	name: 'SideLeaderboard',
	components: { SideLeaderboardList, IonSelect, IonSelectOption },
	setup () {
		return { times, time }
	}
})
</script>
