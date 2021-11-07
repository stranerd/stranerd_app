<template>
	<div class="flex flex-col mt-1 py-3">
		<div class="bg-light_gray rounded-lg py-4 px-3 flex flex-col">
			<div class="flex flex-row items-center">
				<Avatar :photo-url="answer.avatar?.link" :size="'30'" class="mr-2" />
				<span class="font-bold text-dark_gray">{{ answer.userBio.fullName }}</span>
				<div class="flex flex-row-reverse flex-grow">
					<IonIcon :icon="shareSocial" class="text-[22px]  text-icon_inactive" />
					<IonIcon :icon="arrowRedo" class="text-[22px] mr-2 text-icon_inactive" />
				</div>
			</div>

			<pre class="py-5" v-html="answer.title" />

			<div class="flex flex-row items-center justify-between">
				<div class="flex flex-row items-center text-primary font-bold cursor-pointer"
					 @click="showExplanation = !showExplanation">
					<span class="mr-1">Explanation</span>
					<IonIcon v-if="showExplanation" :icon="showExplanation ? chevronUp : chevronDown"
							 class="text-[22px]" />
				</div>
				<div class="flex flex-row items-center text-primary font-bold">
					<span class="mr-1">Comments</span>
					<IonIcon :icon="chevronDown" class="text-[22px]" />
				</div>
			</div>

			<pre v-if="showExplanation" class="py-3" v-html="answer.body" />

			<div v-if="answer.attachments && showExplanation" class="col-span-12 py-3">
				<photo-list :photos="answer?.attachments"></photo-list>
			</div>

			<div class="flex flex-row items-center justify-between mt-5">
				<div class="flex flex-row items-center text-primary font-bold">
					<span class="mr-1">({{ answer.upVotes }})</span>
					<IonIcon :icon="thumbsUp" class="text-[22px] mr-2" />
					<span class="mr-1 text-icon_inactive">({{ answer.downVotes }})</span>
					<IonIcon :icon="thumbsDown" class="text-[22px] text-icon_inactive" />
				</div>
				<div class="flex flex-row items-center text-icon_inactive font-bold">
					<template v-if="!answer.best">
						<span class="mr-1">Mark as best</span>
						<IonIcon :icon="star" class="text-[20px]" />
					</template>
					<template v-else>
						<IonIcon :icon="star" class="text-[20px] text-star_yellow" />
					</template>
				</div>
			</div>
		</div>
		<div class="mt-2 py-1 flex flex-row border-faded_gray border-b-2">
			<input class="px-1  focus:outline-none placeholder-gray-400 flex-grow" placeholder="Leave a comment" />
			<IonIcon :icon="send" class="text-[22px] mr-2 text-dark_gray" />
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonIcon } from '@ionic/vue'
import { AnswerEntity } from '@modules/questions'
import {
	arrowBackOutline,
	arrowRedo,
	chevronDown,
	chevronUp,
	send,
	shareSocial,
	star,
	thumbsDown,
	thumbsUp
} from 'ionicons/icons'

import Avatar from '@app/components/core/AvatarUser.vue'
import PhotoList from '@app/components/core/PhotoList.vue'

export default defineComponent({
	name: 'AnswerListCard',
	components: { IonIcon, Avatar, PhotoList },
	props: {
		answer: {
			type: AnswerEntity,
			required: true
		}
	},
	setup () {
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
			chevronUp,
			showExplanation
		}
	}
})
</script>
