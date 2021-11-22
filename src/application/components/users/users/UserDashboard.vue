<template>
	<div class="col-span-12 flex flex-col px-3">
		<div
			class="py-4 px-4 lg:py-9 lg:px-7 bg-light_green rounded-xl flex gap-3 lg:gap-0 flex-row flex-wrap items-center">
			<div class="w-full lg:w-1/2 flex flex-col gap-2 justify-center items-center lg:items-start lg:px-9">
				<h2 class="headings text-main_dark font-bold  lg:text-lg">Nerd Score</h2>
				<p class="text-center text-icon_inactive lg:text-left">
					Ranking quotient calculated by
					your usage and interactions.
				</p>
			</div>
			<div class="flex flex-col justify-center items-center w-full lg:w-1/2 ">
				<div class="py-3">
					<DonutChart :score="user.score" :size="120" :total="user.expectedScore" />
				</div>
			</div>
		</div>
		<div class="flex flex-row flex-wrap mt-4 mb-7">
			<div class="w-1/2 pr-2">
				<div class="flex flex-col rounded-lg bg-light_gray py-9 px-4 gap-3 justify-center items-center">
					<h4 class=" text-icon_inactive font-bold">Questions</h4>
					<h4 class="text-base md:text-lg text-main_dark font-bold">
						{{ formatNumber(user.meta.questions) }}
					</h4>
				</div>
			</div>
			<div class="w-1/2 pl-2">
				<div class="flex flex-col rounded-lg bg-light_gray py-5 px-4 gap-3 justify-center items-center">
					<h4 class=" text-icon_inactive font-bold">Answers</h4>
					<h4 class="text-base md:text-lg text-main_dark font-bold">
						{{ formatNumber(user.meta.answers) }}
					</h4>
					<div class="flex flex-row items-center">
						<ion-icon :icon="star" class="text-[20px] text-star_yellow mr-1"></ion-icon>
						<span class="font-bold text-icon_inactive">{{ formatNumber(user.meta.bestAnswers) }}</span>
					</div>
				</div>
			</div>

			<div class="w-full mt-2 lg:mt-4">
				<div class="flex flex-col rounded-lg bg-light_gray py-9 px-4 gap-3 justify-center items-center">
					<h4 class=" text-icon_inactive font-bold">Joined</h4>
					<h4 class="text-sm md:text-lg text-main_dark font-bold">
						{{ formatTime(user.dates.createdAt) }}
					</h4>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatNumber, pluralize } from '@utils/commons'
import { formatTime } from '@utils/dates'
import { UserEntity } from '@modules/users'
import { star } from 'ionicons/icons'

export default defineComponent({
	name: 'ProfileDashboard',
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup () {
		return { formatNumber, formatTime, pluralize, star }
	}
})
</script>
