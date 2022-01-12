<template>
	<Justified>
		<div>
			<div class="blueTop !min-h-0 py-8 flex-col">
				<div class="flex w-full lg:w-8/12 mx-auto px-4 text-white items-center justify-center">
					<ion-text class="heading lg:text-2xl font-bold capitalize">{{ tag }}</ion-text>
				</div>
			</div>
			<div class="p-4 lg:w-8/12 w-full showcase mx-auto">
				<QuestionListCard v-for="question in questions" :key="question.hash" :question="question" />
			</div>
		</div>
		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { useRoute } from 'vue-router'
import { useTagQuestionList } from '@app/composable/questions/tag-questions'
import QuestionListCard from '@app/components/questions/questions/RecentQuestionListCard.vue'

export default defineComponent({
	name: 'TagPage',
	components: { Justified, QuestionListCard },
	setup () {
		const { tag } = useRoute().params
		const { error, loading, questions, listener } = useTagQuestionList(tag as string)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { tag, error, loading, questions }
	}
})
</script>
