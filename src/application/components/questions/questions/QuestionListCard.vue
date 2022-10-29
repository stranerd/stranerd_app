<template>
	<router-link :to="`/questions/${question.id}`" class="flex flex-col card-sm card-padding">
		<div class="flex justify-between gap-2 items-center">
			<Avatar :id="question.user.id" :size="36" :src="question.user.bio.photo" />
			<div class="flex flex-col truncate">
				<UserName :isTutor="question.user.roles.isStranerdTutor" :name="question.user.bio.fullName"
					class="font-semibold text-secondaryText" />
				<div class="flex gap-2 items-center text-secondaryText text-sm">
					<InteractionTag :tagId="question.tagId" class="truncate" />
					<IonIcon :icon="ellipse" class="dot" />
					<span>{{ formatTime(question.createdAt) }}</span>
				</div>
			</div>
			<div class="flex-1" />
			<IonButton v-if="showAnswerButton" class="btn-primary" @click="openAnswerModal(question, $router)">
				Answer
			</IonButton>
		</div>
		<DisplayHtml :html="question.trimmedBody" />

		<div class="flex items-center gap-5 text-secondaryText text-sm w-full">
			<span class="flex gap-1 items-center">
				<IonIcon :icon="chatbubbleEllipsesOutline" />
				<span>{{ formatNumber(question.answers.length) }}</span>
			</span>
			<span class="flex gap-1 items-center mr-auto">
				<IonIcon :icon="imageOutline" />
				<span>{{ formatNumber(question.attachments.length) }}</span>
			</span>

			<Share :link="question.shareLink" :text="question.strippedBody" title="Share this question" />
			<SaveToSet :entity="question" />
		</div>
	</router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { chatbubbleEllipsesOutline, ellipse, helpCircleOutline, imageOutline } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
import { formatNumber } from '@utils/commons'
import { openAnswerModal } from '@app/composable/questions/answers'
import { useAuth } from '@app/composable/auth/auth'
import InteractionTag from '@app/components/interactions/tags/Tag.vue'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'

export default defineComponent({
	name: 'QuestionListCard',
	components: { InteractionTag, SaveToSet },
	props: {
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const showAnswerButton = computed({
			get: () => props.question.user.id !== id.value && !props.question.isAnswered && !props.question.answers.find((a) => a.userId === id.value),
			set: () => {
			}
		})
		return {
			showAnswerButton, openAnswerModal, formatTime, formatNumber,
			imageOutline, chatbubbleEllipsesOutline, ellipse, helpCircleOutline
		}
	}
})
</script>
