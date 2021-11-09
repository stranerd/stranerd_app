<template>
	<div class="w-full flex flex-col py-3 px-2 ">


		<div class="flex flex-col text-sm text-dark_gray gap-3">



			<div class="flex flex-row justify-between items-center">
				<h2 class="text-dark_gray text-base font-bold ">Ranking</h2>
				<!-- <div class="flex flex-row items-center text-sm py-0 pr-2 rounded-lg bg-light_gray">
					<ion-select class="w-full text-xs md:text-sm  placeholder-[#8B9EB1] font-semibold"
						interface="action-sheet"
						placeholder="Filter by subject" value="notifications">
						<ion-select-option class="text-sm" value="maths">Mathematics</ion-select-option>
						<ion-select-option class="text-sm" value="physics">Physics</ion-select-option>
						<ion-select-option class="text-sm" value="bio">Biology</ion-select-option>
						<ion-select-option class="text-sm" value="geo">Geography</ion-select-option>
						<ion-select-option class="text-sm" value="business">Business</ion-select-option>
						<ion-select-option class="text-sm" value="civil">Civil Right</ion-select-option>
					</ion-select>
				</div> -->
			</div>

			<div v-if="user" class="py-3 px-3 rounded-lg flex w-full bg-icon_inactive text-white flex-row items-center">
				<span class="font-semibold mr-2">-</span>
				<span>{{ user.bio.fullName }}</span>
				<div class="flex flex-row-reverse items-center flex-grow">
					<span class="font-semibold">{{ user.account.rankings[RankType] }}</span>
				</div>
			</div>


			<div class="flex flex-col items-center mt-3 text-sm text-dark_gray gap-2">
				<template v-if="leaderboardData.length">
					<div v-for="(person, index) in leaderboardData" :key="person.id" class="py-3 px-3 rounded-lg flex w-full bg-light_gray flex-row items-center">
						<span class="font-semibold mr-2">{{ index + 1 }}</span>
						<span>{{ person.bio.fullName }}</span>
						<div class="flex flex-row-reverse items-center flex-grow">
							<span class="text-primary font-semibold">{{ person.account.rankings[RankType] }}</span>
						</div>
					</div>
				</template>

				<router-link class="py-3 px-3 rounded-lg flex w-full bg-primary text-white justify-center flex-row items-center"
					to="/leaderboard">
					<span class="font-semibold">Leaderboard</span>
				</router-link>
			</div>

		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonSelect, IonSelectOption } from '@ionic/vue'
import { useAuth } from '@app/composable/auth/auth'
import { useLeaderboardList } from '@app/composable/users/leaderboard'

export default defineComponent({
	setup () {
		const { ShortenedfilteredUsers: leaderboardData, loading, Userindex, RankType } = useLeaderboardList()
		const { user } = useAuth()

		return {
			user,
			RankType,
			leaderboardData,
			loading,
			Userindex,

		}
	},
	// components: {
	// 	IonSelect,
	// 	IonSelectOption
	// }
})
</script>
