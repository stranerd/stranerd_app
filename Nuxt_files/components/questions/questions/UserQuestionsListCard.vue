<template>
	<div :id="question.id" class="flex flex-col py-1 border-bottom border-line gap-1">
		<NuxtLink :to="`/questions/${question.id}`" class="text-18">
			<DynamicText>{{ question.trimmedBody }}</DynamicText>
		</NuxtLink>
		<div class="flex items-center flex-row flex-wrap gap-1">
			<div class="flex items-center flex-wrap gap-0-5 gap-md-1 me-auto tags">
				<Tag v-for="tag in question.tags" :key="tag" :tag="tag" />
			</div>
			<img v-if="question.isAnswered" class="sub-icons" src="@app/assets/images/icons/profile-best-answers.svg">
			<div v-if="question.isAnswered" class="dot" />
			<Subject :subject-id="question.subjectId" />
			<div class="dot" />
			<DynamicText class="name">
				Posted {{ formatTime(question.createdAt) }}
			</DynamicText>
			<div class="dot" />
			<div class="flex items-center gap-1">
				<span class="flex items-center gap-0-25">
					<img alt="" class="sub-icons" src="@app/assets/images/icons/answers.svg">
					<DynamicText>
						{{
							formatNumber(question.answers.length)
						}} {{ pluralize(question.answers.length, 'answer', 'answers') }}
					</DynamicText>
				</span>
				<span v-if="question.attachments" class="flex items-center gap-0-25">
					<i class="sub-icons fas fa-paperclip" />
					<DynamicText>
						{{
							formatNumber(question.attachments)
						}} {{ pluralize(question.attachments, 'image', 'images') }}
					</DynamicText>
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Tag from '@app/components/questions/tags/Tag.vue'
import Subject from '@app/components/questions/subjects/Subject.vue'
import { QuestionEntity } from '@/modules/questions'
import { formatNumber, pluralize } from '@/utils/commons'
import { formatTime } from '@/utils/dates'

export default defineComponent({
	name: 'UserQuestionsListCard',
	components: { Tag, Subject },
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup () {
		return { formatTime, formatNumber, pluralize }
	}
})
</script>

<style lang="scss" scoped>
	.dot {
		width: 6px;
		height: 6px;
		background-color: $color-sub;
		border-radius: 50px;
	}

	.tags {
		flex: 1 0 100%;
		@media (min-width: $md) {
			flex: 1 1 0;
		}
	}
</style>
