<template>
	<div
		v-for="n in  10"
		:key="n"
		class='py-4 px-4 bg-light_gray mt-6  rounded-lg flex flex-col w-full text-xs md:text-sm relative cursor-pointer'>
		<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
		<div class="flex flex-row items-center">
			<img class="inline h-7 mr-2" src="/assets/images/person-circle.svg" />
			<span class="font-bold text-dark_gray">Timmy Nuetron</span>
			<div class="flex flex-row items-center ml-4 hidden md:flex">
				<span class="h-[4px] w-[4px] rounded-full bg-icon_inactive mr-3"></span>
				<span class="text-dark_gray font-bold">Physics</span>
			</div>
			<div class="flex-row items-center ml-4 hidden md:flex">
				<span class="h-[4px] w-[4px] rounded-full bg-icon_inactive mr-3"></span>
				<span class="text-icon_inactive font-bold">30m ago  </span>
			</div>
			<div class="flex flex-row-reverse flex-grow">
				<!-- <span class="font-bold text-icon_inactive lg:mr-2" >30m ago</span> -->
				<button class="py-1 px-5 rounded-lg text-white bg-dark_gray font-bold flex flex-row items-center">
					Message
				</button>
			</div>
		</div>

		<div v-if="props.isFeatured" class="mt-3">
			<button class="py-1 px-3 rounded-lg text-white bg-star_yellow font-bold flex flex-row items-center">
				Featured
			</button>
		</div>
		<div class="mt-3 flex flex-row items-center gap-2 md:hidden">
			<span class="font-bold text-dark_gray">Physics</span>
			<span class="h-[5px] w-[5px] rounded-full bg-icon_inactive "></span>
			<span class="text-icon_inactive font-bold">30m ago  </span>
		</div>

		<p class="py-2 text-dark_gray leading-normal">
			From the top of a building with a height of 16 meters, a ball is thrown at angle of 30 degrees to the
			horizontal plane at a speed of 21 m/s.
			Calculate the total time the ball is in the air?
		</p>
		<div class="flex md:gap-5 flex-col md:flex-row md:mt-2">
			<span v-for="n in 3" :key="n" class="text-primary flex items-center font-bold">
				<ion-icon :icon="attachOutline" class="text-[22px]  text-primary rotate-45"></ion-icon>
				<span>10192calculus.pdf</span>
			</span>
		</div>


		<div v-if="!fromHome" class="mt-6 mb-2 flex flex-row items-center gap-4 flex-wrap">
			<div class="flex items-center text-icon_inactive w-1/2 sm:w-auto">
				<ion-icon :icon="school" class="text-[22px]  mr-1 "></ion-icon>
				<span class="font-bold">college year 1</span>
			</div>
			<div class="flex items-center text-icon_inactive">
				<ion-icon :icon="calendar" class="text-[22px] mr-1 "></ion-icon>
				<span class="font-bold">starting now</span>
			</div>
			<div class="flex items-center text-icon_inactive w-1/2 sm:w-auto">
				<ion-icon :icon="time" class="text-[22px] mr-1 "></ion-icon>
				<span class="font-bold">1 hour</span>
			</div>
			<div class="flex items-center text-icon_inactive ">
				<Coins :gold="true" :size="22" />
				<span class=" ml-1 font-bold text-dark_gray">20</span>
			</div>

		</div>

	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonIcon, IonRippleEffect } from '@ionic/vue'
import { attachOutline, calendar, school, time } from 'ionicons/icons'
import Coins from '../../core/Coins.vue'

export default defineComponent({
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		isFeatured: {
			type: Boolean,
			default: false
		},
		fromViewQuestion: {
			type: Boolean,
			default: false
		},
		fromHome: {
			type: Boolean,
			default: false
		}

	},
	components: {
		IonIcon, IonRippleEffect, Coins
	},

	setup (props) {
		const showAnswers = () => {
		}

		return {
			props,
			attachOutline,
			school,
			calendar,
			time,
			showAnswers
		}
	}
})
</script>
