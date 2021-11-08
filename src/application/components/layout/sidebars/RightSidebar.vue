<template>
	<div class="w-full flex flex-col py-3 px-2 ">

		<!-- <div class="flex flex-row justify-between items-center ">
			<h2 class="text-dark_gray text-base font-bold ">Challenges</h2>
			<div class="flex flex-row items-center text-sm font-semibold text-primary ">
				<span class="text-sm text-primary  ">view all</span>
				<i class="las la-angle-right" style="font-size: 22px;"></i>
			</div>
		</div> -->

		<div class="flex flex-col text-sm text-dark_gray gap-3">
			<!-- <div class="bg-light_blue py-4 px-4 rounded-xl flex flex-col">
				<h2 class="mb-2">Reach the rank of <b>{{ user?.nextRank?.id }}</b></h2>
				<div class="flex flex-row rounded-xl py-[4px] relative bg-faded_gray">
					<div :class="`absolute left-0 top-0 h-full rounded-xl bg-primary`" :style="`width:${rankPercentage(user?.nextRank?.score, user?.rank.score)};`">
					</div>
				</div>
			</div>

			<div class="bg-light_gray py-4 px-4 rounded-xl flex flex-col">
				<h2 class="mb-2">Answer 30 questions</h2>
				<div class="flex flex-row rounded-xl py-[4px] relative bg-faded_gray">
					<div class="absolute left-0 top-0 h-full rounded-xl bg-primary" :style="`width:${rankPercentage(30, user?.account?.meta?.answers )};`">
					</div>
				</div>
			</div>

			<div class="bg-light_gray py-4 px-4 rounded-xl flex flex-col">
				<h2 class="mb-2">Get 30 best answers</h2>
				<div class="flex flex-row rounded-xl py-[4px] relative bg-faded_gray">
					<div class="absolute left-0 top-0 h-full rounded-xl bg-primary" :style="`width:${rankPercentage(30, user?.account?.meta?.bestAnswers )};`">
					</div>
				</div>
			</div>

			<div class="bg-light_gray py-4 px-4 rounded-xl flex flex-col">
				<h2 class="mb-2">5 days login streak</h2>
				<div class="flex flex-row rounded-xl py-[4px] relative bg-faded_gray">
					<div class="absolute left-0 top-0 h-full rounded-xl bg-primary" :style="`width:${rankPercentage(5, user?.account?.streak.longestStreak )};`">
					</div>
				</div>
			</div> -->


			<div class="flex flex-row justify-between items-center">
				<h2 class="text-dark_gray text-base font-bold ">Ranking</h2>
				<div class="flex flex-row items-center text-sm py-0 pr-2 rounded-lg bg-light_gray">
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
				</div>
			</div>


			<div class="flex flex-col items-center mt-3 text-sm text-dark_gray gap-2">
				<div class="py-3 px-3 rounded-lg flex w-full bg-light_gray flex-row items-center">
					<span class="font-semibold mr-2">122</span>
					<span>Jerry Maguire</span>
					<div class="flex flex-row-reverse items-center flex-grow">
						<span class="text-primary font-semibold">14</span>
					</div>
				</div>
				<div class="py-3 px-3 rounded-lg flex w-full bg-light_gray flex-row items-center">
					<span class="font-semibold mr-2">122</span>
					<span>Jerry Maguire</span>
					<div class="flex flex-row-reverse items-center flex-grow">
						<span class="text-primary font-semibold">14</span>
					</div>
				</div>
				<div class="py-3 px-3 rounded-lg flex w-full bg-icon_inactive text-white flex-row items-center">
					<span class="font-semibold mr-2">122</span>
					<span>Jerry Maguire</span>
					<div class="flex flex-row-reverse items-center flex-grow">
						<span class="font-semibold">14</span>
					</div>
				</div>
				<div class="py-3 px-3 rounded-lg flex w-full bg-light_gray flex-row items-center">
					<span class="font-semibold mr-2">122</span>
					<span>Jerry Maguire</span>
					<div class="flex flex-row-reverse items-center flex-grow">
						<span class="text-primary font-semibold">14</span>
					</div>
				</div>
				<div class="py-3 px-3 rounded-lg flex w-full bg-light_gray flex-row items-center">
					<span class="font-semibold mr-2">122</span>
					<span>Jerry Maguire</span>
					<div class="flex flex-row-reverse items-center flex-grow">
						<span class="text-primary font-semibold">14</span>
					</div>
				</div>
				<router-link class="py-3 px-3 rounded-lg flex w-full bg-primary text-white justify-center flex-row items-center"
					to="/leaderboard">
					<span class="font-semibold">Leaderboard</span>
				</router-link>
			</div>

		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonSelect, IonSelectOption } from '@ionic/vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	setup () {
		const { user } = useAuth()

		const rankPercentage = (next: number | undefined, present: number | undefined) => {
			let percentage = 0
			if (next && present != undefined) {
				if (present == 0) {
					percentage = (2 / next) * 100
				} else {
					percentage = (present / next) * 100
				}
			}
			return percentage.toString() + '%'
		}
		return {
			user,
			rankPercentage
		}
	},
	components: {
		IonSelect,
		IonSelectOption
	}
})
</script>
