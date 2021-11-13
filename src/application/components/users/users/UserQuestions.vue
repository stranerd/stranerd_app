<template>
	<div v-if="loading" class="flex items-center justify-center w-full col-span-12 pt-12 px-5">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>


	<div v-if="!loading && questions" class="col-span-12 flex flex-col px-3  normalText">
		<template v-if="questions.length">
			<div v-for="question in questions" :key="question.hash" class=" w-full md:px-2 md:py-3 mb-4 md:mb-0">
				<UserQuestionsCard :question="question" />
			</div>
		</template>

		<empty-state
			v-else
			btnText="Go and ask a Question"
			info="You haven't asked any questions yet, click the button below to ask a question"
			route="/questions/"
		/>


	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonProgressBar } from '@ionic/vue'
import UserQuestionsCard from '@app/components/questions/UserQuestionsCard.vue'
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
