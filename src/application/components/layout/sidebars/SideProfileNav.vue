<template>
	<div class="w-full flex flex-col py-3 px-2 ">

		<div class="flex flex-row justify-between items-center ">
			<h2 class="text-dark_gray text-base font-bold ">Challenges</h2>
			<div class="flex flex-row items-center text-sm font-semibold text-primary ">
				<span class="text-sm text-primary  ">view all</span>
				<i class="las la-angle-right" style="font-size: 22px;"></i>
			</div>
		</div>

		<div class="mt-3 flex flex-col text-sm text-dark_gray gap-3">
			<div class="bg-light_blue py-4 px-4 rounded-xl flex flex-col">
				<h2 class="mb-2">Reach the rank of <b>Comrade</b></h2>
				<div class="flex flex-row rounded-xl py-[4px] relative bg-faded_gray">
					<div class="absolute left-0 top-0 h-full w-9/12 rounded-xl bg-primary">
					</div>
				</div>
			</div>

			<div class="bg-light_gray py-4 px-4 rounded-xl flex flex-col">
				<h2 class="mb-2">Answer 30 questions</h2>
				<div class="flex flex-row rounded-xl py-[4px] relative bg-faded_gray">
					<div class="absolute left-0 top-0 h-full w-8/12 rounded-xl bg-primary">
					</div>
				</div>
			</div>

			<div class="bg-light_gray py-4 px-4 rounded-xl flex flex-col">
				<h2 class="mb-2">Get 30 best answers</h2>
				<div class="flex flex-row rounded-xl py-[4px] relative bg-faded_gray">
					<div class="absolute left-0 top-0 h-full w-5/12 rounded-xl bg-primary">
					</div>
				</div>
			</div>

			<div class="bg-light_gray py-4 px-4 rounded-xl flex flex-col">
				<h2 class="mb-2">5 days login streak</h2>
				<div class="flex flex-row rounded-xl py-[4px] relative bg-faded_gray">
					<div class="absolute left-0 top-0 h-full w-5/12 rounded-xl bg-primary">
					</div>
				</div>
			</div>


			<div class="flex flex-row justify-between items-center mt-4">
				<h2 class="text-dark_gray text-base font-bold ">Ranking</h2>
				<div class="flex flex-row items-center text-sm py-0 pr-2 rounded-lg bg-light_gray">
					<ion-select value="notifications" class="w-full text-xs md:text-sm  placeholder-[#8B9EB1] font-semibold" placeholder="Filter by subject" interface="action-sheet">
						<ion-select-option value="maths" class="text-sm">Mathematics</ion-select-option>
						<ion-select-option value="physics" class="text-sm">Physics</ion-select-option>
						<ion-select-option value="bio" class="text-sm">Biology</ion-select-option>
						<ion-select-option value="geo" class="text-sm" >Geography</ion-select-option>
						<ion-select-option value="business" class="text-sm">Business</ion-select-option>
						<ion-select-option value="civil" class="text-sm">Civil Right</ion-select-option>
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
				<div class="py-3 px-3 rounded-lg flex w-full bg-primary text-white justify-center flex-row items-center">
					<span class="font-semibold">Leaderboard</span>
				</div>
			</div>

		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonSelect, IonSelectOption } from '@ionic/vue'

export default defineComponent({
	setup() {
		return {}
	},
	components: {
		IonSelect,
		IonSelectOption
	}
})
</script>
