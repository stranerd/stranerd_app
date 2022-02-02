<template>
	<div v-if="loading" class="col-span-12 flex items-center justify-center w-full py-12 px-4">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>
	<div v-else class="col-span-12 flex flex-col gap-4 text-body p-4">
		<UserQuestionsCard v-for="question in questions" :key="question.hash" :question="question" />
		<EmptyState v-if="!loading && !error && questions.length === 0"
			info="This user hasn't asked any questions yet" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonProgressBar } from '@ionic/vue'
import UserQuestionsCard from '@app/components/questions/questions/UserQuestionsListCard.vue'
import { useUserQuestionList } from '@app/composable/users/user/questions'
import EmptyState from '../../core/EmptyState.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'ProfileQuestions',
	components: { UserQuestionsCard, IonProgressBar, EmptyState },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const {
			filteredQuestions: questions, subjectId, error, loading, hasMore,
			answered, answeredChoices, fetchOlderQuestions
		} = useUserQuestionList(props.user.id)
		return {
			questions, error, loading, hasMore, subjectId,
			answeredChoices, answered,
			fetchOlderQuestions
		}
	}
})
</script>
