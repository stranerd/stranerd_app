<template>
	<div class="flex flex-col mt-3 py-3">
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
			<div class="flex flex-row items-center justify-between">
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
					<span class="mr-1">Mark as best</span>
					<ion-icon :icon="star" class="text-[20px] "></ion-icon>
				</div>
			</div>

		</div>
		<div class="mt-2 py-1 flex flex-row border-faded_gray border-b-2">
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
	setup() {
		
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
