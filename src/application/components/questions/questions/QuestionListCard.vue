<template>
	<router-link
		:to="`/questions/${question.id}`"
		class="md:rounded-xl bg-white flex flex-col card-padding justify-between w-full relative cursor-pointer">
		<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
		<div class="flex flex-row items-center">
			<div class="flex items-center text-sub">
				<avatar :id="question.user.id" :name="question.user.bio.fullName" :size="28"
					:src="question.user.bio.photo"
					class="mr-2 " />
				<span class="text-secondaryText hidden md:flex items-center gap-1">
					<span>{{ question.user.bio.fullName }}</span>
					<Verified :verified="question.isUserVerified" />
				</span>
				<span class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3 ml-2 hidden md:block" />
				<span class="text-secondaryText capitalize">{{ question.subject }}</span>
			</div>

			<ion-button v-if="showAnswerButton"
				class="btn-outline border-primary text-primary btn-outline-sm ml-auto btn-sm"
				mode="md"
				@click="openAnswerModal(question)">
				Answer
			</ion-button>
		</div>

		<DisplayHtml :html="question.trimmedBody" class="text-secondaryText leading-normal font-500" />

		<div class="flex justify-between items-center gap-4 text-secondaryText text-sub">
			<span class="lg:mr-2">{{ formatTime(question.createdAt) }}</span>
			<span v-if="question.attachments.length" class="font-italic flex items-center">
				<IonIcon :icon="imageOutline" class="mr-2" />  IMG inside
			</span>
			<span>
				{{ question.answers.length }} {{ pluralize(question.answers.length, 'answer', 'answers') }}
			</span>
		</div>
	</router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IonRippleEffect } from '@ionic/vue'
import { arrowRedoOutline, flagOutline, imageOutline } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
import { pluralize } from '@utils/commons'
import Avatar from '@app/components/core/Avatar.vue'
import { openAnswerModal } from '@app/composable/questions/answers'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'QuestionListCard',
	props: {
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	components: { IonRippleEffect, Avatar },
	setup (props) {
		const { id } = useAuth()
		const showAnswerButton = computed({
			get: () => props.question.user.id !== id.value && !props.question.isAnswered && !props.question.answers.find((a) => a.userId === id.value),
			set: () => {
			}
		})
		return {
			showAnswerButton, openAnswerModal, formatTime, pluralize,
			arrowRedoOutline, flagOutline, imageOutline
		}
	}
})
</script>
