<template>
	<router-link :to="`/questions/${question.id}`" class="flex flex-col card-padding">
		<div class="flex items-center text-secondaryText text-sub justify-between">
			<div class="flex items-center gap-2">
				<Avatar :id="question.user.id" :name="question.user.bio.fullName" :size="24"
					:src="question.user.bio.photo" />
				<span class="flex items-center gap-1 font-bold">
					<span>{{ question.user.bio.fullName }}</span>
					<Verified :verified="question.isUserVerified" />
				</span>
			</div>
			<IonButton v-if="showAnswerButton"
				class="btn-primary" style="--border-radius: 10rem;"
				@click="openAnswerModal(question)">
				Answer
			</IonButton>
		</div>

		<DisplayHtml :html="question.trimmedBody" class="pl-8" />

		<div class="flex justify-between items-center gap-2 text-secondaryText text-sub pl-8">
			<QuestionTag :tagId="question.tagId" />
			<IonIcon :icon="ellipse" class="dot" />
			<span class="mr-auto">{{ formatTime(question.createdAt) }}</span>
			<IonIcon v-if="question.attachments.length" :icon="imageOutline" class="text-heading" />
			<span class="flex gap-1 items-center">
				<span>{{ formatNumber(question.answers.length) }}</span>
				<IonIcon :icon="readerOutline" class="text-heading" />
			</span>
		</div>
	</router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { arrowRedoOutline, ellipse, flagOutline, imageOutline, readerOutline } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
import { formatNumber, pluralize } from '@utils/commons'
import { openAnswerModal } from '@app/composable/questions/answers'
import { useAuth } from '@app/composable/auth/auth'
import QuestionTag from '@app/components/questions/tags/Tag.vue'

export default defineComponent({
	name: 'QuestionListCard',
	components: { QuestionTag },
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
			showAnswerButton, openAnswerModal, formatTime, formatNumber, pluralize,
			arrowRedoOutline, flagOutline, imageOutline, readerOutline, ellipse
		}
	}
})
</script>
