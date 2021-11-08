<template>
	<div :id="answer.id" class="flex flex-col mt-1 py-3">
		<div class="bg-light_gray rounded-lg py-4 px-3 flex flex-col">

			<router-link :to="`/questions/${answer.questionId}#${answer.id}`" class="py-5">
				{{ answer.trimmedTitle }}
			</router-link>

			<div class="flex items-center justify-between">
				<div class="flex flex-row items-center justify-between mt-5 gap-2">
					<div class="text-primary flex items-center justify-between">
						<span class="mr-1">(24)</span>
						<ion-icon :icon="thumbsUp" class="text-[22px] mr-2"></ion-icon>
					</div>

					<div class="text-icon_inactive flex items-center justify-between">
						<span class="mr-1">(2)</span>
						<ion-icon :icon="thumbsDown" class="text-[22px] mr-2"></ion-icon>
					</div>


					<ion-icon :icon="star" class="text-[20px] text-star_yellow"></ion-icon>

				</div>

				<div class="flex flex-row items-center justify-between mt-4">
					<span class="font-bold text-icon_inactive">Posted {{ formatTime(answer.createdAt) }}</span>
				</div>
			</div>


		</div>

	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IonIcon } from '@ionic/vue'

import { arrowBackOutline, arrowRedo, shareSocial, chevronDown, thumbsDown, thumbsUp, star, send } from 'ionicons/icons'
import { AnswerEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'

export default defineComponent({
	name: 'eachAnswer',
	components: { IonIcon },
	props: {
		answer: {
			required: true,
			type: Object as PropType<AnswerEntity>
		}
	},

	setup (props: any) {

		return {
			formatTime,
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
})
</script>
