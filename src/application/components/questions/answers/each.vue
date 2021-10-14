<template>
	<div class="flex flex-col mt-1 py-3">
		<div class="bg-light_gray rounded-lg py-4 px-3 flex flex-col">
			<div class="flex flex-row items-center">
				<img src="/assets/images/person-circle.svg" class="inline h-7 mr-2"/>
				<span class="font-bold text-dark_gray">Timmy Nuetron</span>
				<div class="flex flex-row-reverse flex-grow">
					<ion-icon :icon="shareSocial" class="text-[22px]  text-icon_inactive"></ion-icon>
					<ion-icon :icon="arrowRedo" class="text-[22px] mr-2 text-icon_inactive"></ion-icon>
				</div>
			</div>
			<p class="py-5">
				5m/s per hour
			</p>
			<div class="flex flex-row items-center justify-between" v-if="!isProfile">
				<div class="flex flex-row items-center text-primary font-bold">
					<span class="mr-1">Explanation</span>
					<ion-icon :icon="chevronDown" class="text-[22px] "></ion-icon>
				</div>
				<div class="flex flex-row items-center text-primary font-bold">
					<span class="mr-1">Comments</span>
					<ion-icon :icon="chevronDown" class="text-[22px] "></ion-icon>
				</div>
			</div>

			<div class="flex flex-row items-center justify-between mt-5">
				<div class="flex flex-row items-center text-primary font-bold">
					<span class="mr-1">(24)</span>
					<ion-icon :icon="thumbsUp" class="text-[22px] mr-2"></ion-icon>
					<span class="mr-1 text-icon_inactive">(2)</span>
					<ion-icon :icon="thumbsDown" class="text-[22px] text-icon_inactive"></ion-icon>
				</div>
				<div class="flex flex-row items-center text-icon_inactive font-bold ">
					<template v-if="!isProfile">
						<span class="mr-1">Mark as best</span>
						<ion-icon :icon="star" class="text-[20px] "></ion-icon>
					</template>
					<template v-else>
						<ion-icon :icon="star" class="text-[20px] text-star_yellow"></ion-icon>
					</template>	
				</div>
			</div>

			<div class="flex flex-row items-center justify-between mt-4" v-if="isProfile">
				<span class="font-bold text-icon_inactive">5 answers</span>
			</div>

		</div>
		<div class="mt-2 py-1 flex flex-row border-faded_gray border-b-2" v-if="!isProfile">
			<input class="px-1  focus:outline-none placeholder-gray-400 flex-grow" placeholder="Leave a comment" />
			<ion-icon :icon="send" class="text-[22px] mr-2 text-dark_gray"></ion-icon>
		</div>
	</div>
</template>
<script lang="ts">

import { IonIcon } from '@ionic/vue'

import { arrowBackOutline, arrowRedo, shareSocial, chevronDown, thumbsDown, thumbsUp, star, send } from 'ionicons/icons'

export default  {
	name: 'eachAnswer',
	components: { IonIcon },
	props: {
		isProfile: {
			type: Boolean,
			default: false
		}
	},
	setup(props: any) {
		
		return {
			arrowBackOutline,
			arrowRedo,
			shareSocial,
			chevronDown,
			thumbsDown,
			thumbsUp,
			star,
			send
		}
	}
}
</script>
