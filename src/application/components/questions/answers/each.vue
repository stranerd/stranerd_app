<template>
	<div class="flex flex-col mt-1 py-3">
		<div class="bg-light_gray rounded-lg py-4 px-3 flex flex-col">
			<div class="flex flex-row items-center">
				<span class="mr-2"><avatar :photo-url="answer?.avatar?.link" :size="'30'"/></span>
				<span class="font-bold text-dark_gray">{{ answer?.userBio.fullName }}</span>
				<div class="flex flex-row-reverse flex-grow">
					<ion-icon :icon="shareSocial" class="text-[22px]  text-icon_inactive"></ion-icon>
					<ion-icon :icon="arrowRedo" class="text-[22px] mr-2 text-icon_inactive"></ion-icon>
				</div>
			</div>
			<p class="py-5" v-html="answer?.title">
			</p>
			<div class="flex flex-row items-center justify-between" v-if="!isProfile">
				<div class="flex flex-row items-center text-primary font-bold cursor-pointer" @click="showExplanation ? showExplanation = false : showExplanation = true ">
					<span class="mr-1">Explanation</span>
					<ion-icon v-if="!showExplanation" :icon="chevronDown" class="text-[22px] "></ion-icon>
					<ion-icon v-if="showExplanation" :icon="chevronUp" class="text-[22px] "></ion-icon>
				</div>
				<div class="flex flex-row items-center text-primary font-bold">
					<span class="mr-1">Comments</span>
					<ion-icon :icon="chevronDown" class="text-[22px] "></ion-icon>
				</div>
			</div>

			<p class="py-3" v-html="answer?.body" v-if="showExplanation">
			</p>

			<div class="col-span-12 py-3" v-if="showExplanation">
				<photo-list  :photos="answer?.attachments"></photo-list>
			</div>

			<div class="flex flex-row items-center justify-between mt-5">
				<div class="flex flex-row items-center text-primary font-bold">
					<span class="mr-1">({{ answer?.upVotes }})</span>
					<ion-icon :icon="thumbsUp" class="text-[22px] mr-2"></ion-icon>
					<span class="mr-1 text-icon_inactive">({{ answer?.downVotes }})</span>
					<ion-icon :icon="thumbsDown" class="text-[22px] text-icon_inactive"></ion-icon>
				</div>
				<div class="flex flex-row items-center text-icon_inactive font-bold ">
					<template v-if="!isProfile || !answer?.best">
						<span class="mr-1">Mark as best</span>
						<ion-icon :icon="star" class="text-[20px] "></ion-icon>
					</template>
					<template v-else>
						<ion-icon :icon="star" class="text-[20px] text-star_yellow"></ion-icon>
					</template>	
				</div>
			</div>

			<div class="flex flex-row items-center justify-between mt-4" v-if="isProfile">
				<span class="font-bold text-icon_inactive">{{ answer?.commentsCount }} comments</span>
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

import { arrowBackOutline, arrowRedo, shareSocial, chevronDown, thumbsDown, thumbsUp, star, send, chevronUp } from 'ionicons/icons'
import { AnswerEntity } from '@/modules/questions'
import { defineAsyncComponent, ref } from 'vue'
const Avatar = defineAsyncComponent(() => import('@/application/components/core/AvatarUser.vue'))
const PhotoList = defineAsyncComponent(() => import('@/application/components/core/photoList.vue'))

export default  {
	name: 'eachAnswer',
	components: { IonIcon, Avatar, PhotoList },
	props: {
		isProfile: {
			type: Boolean,
			default: false
		},
		answer: {
			type: AnswerEntity
		}
	},
	setup(props: any) {
		
		const showExplanation = ref(false)
		return {
			arrowBackOutline,
			arrowRedo,
			shareSocial,
			chevronDown,
			thumbsDown,
			thumbsUp,
			star,
			send,
			showExplanation,
			chevronUp
		}
	}
}
</script>
