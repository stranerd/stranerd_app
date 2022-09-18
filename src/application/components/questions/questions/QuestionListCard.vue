<template>
	<router-link :to="`/questions/${question.id}`" class="flex card card-padding !gap-4">
		<Avatar :id="question.user.id" :name="question.user.bio.fullName" :size="48"
			:src="question.user.bio.photo" />
		<div class="flex flex-col flex-1 gap-4">
			<div class="flex justify-between items-center gap-4">
				<div class="flex flex-col flex-1 gap-1">
					<span class="flex items-center gap-1">
						<span class="font-bold">{{ question.user.bio.fullName }}</span>
						<Verified :verified="question.isUserVerified" />
					</span>
					<div class="flex gap-1 items-center text-sm">
						<InteractionTag :tagId="question.tagId" />
						<IonIcon :icon="ellipse" class="dot" />
						<span>{{ formatTime(question.createdAt) }}</span>
					</div>
				</div>
				<IonButton v-if="showAnswerButton" class="btn-primary" style="--border-radius: 10rem;"
					@click="openAnswerModal(question, $router)">
					Answer
				</IonButton>
			</div>

			<DisplayHtml :html="question.trimmedBody" />

			<div class="flex items-center gap-5 text-secondaryText text-sm w-full">
				<span v-if="question.attachments.length" class="flex gap-1 items-center">
					<IonIcon :icon="attachOutline" class="rotate-45" />
					<span>{{ formatNumber(question.attachments.length) }}</span>
				</span>

				<span class="flex gap-1 items-center mr-auto">
					<IonIcon :icon="chatbubbleEllipsesOutline" />
					<span>{{ formatNumber(question.answers.length) }}</span>
				</span>

				<Share :link="question.shareLink" :text="question.strippedBody" title="Share this question" />
				<SaveToSet :entity="question" />
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { attachOutline, chatbubbleEllipsesOutline, ellipse, helpCircleOutline } from 'ionicons/icons'
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
			attachOutline, chatbubbleEllipsesOutline, ellipse, helpCircleOutline
		}
	}
})
</script>
