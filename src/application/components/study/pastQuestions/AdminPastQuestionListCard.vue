<template>
	<div
		class="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white rounded-xl font-bold lg:text-base text-xs text-main_dark py-4 px-6">
		<div class="w-full">
			<ion-text class="capitalize">{{ pastQuestion.name }}</ion-text>
		</div>
		<div class="w-full font-bold text-right cursor-pointer">
			<a class="text-orange mr-4" @click.prevent="openPastQuestionEditModal(pastQuestion)">Edit</a>
			<a class="text-delete_red" @click.prevent="deletePastQuestion">Delete</a>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PastQuestionEntity } from '@modules/study'
import { openPastQuestionEditModal, useDeletePastQuestion } from '@app/composable/study/pastQuestions'

export default defineComponent({
	name: 'AdminPastQuestionListCard',
	props: {
		pastQuestion: {
			type: PastQuestionEntity,
			required: true
		}
	},
	setup (props) {
		const { loading, error, deletePastQuestion } = useDeletePastQuestion(props.pastQuestion)
		return { loading, error, deletePastQuestion, openPastQuestionEditModal }
	}
})
</script>
