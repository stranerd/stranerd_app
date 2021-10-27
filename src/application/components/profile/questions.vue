<template>
	<div class="col-span-12 flex flex-col px-3  normalText">
		<div class=" w-full md:px-2 md:py-3 mb-4 md:mb-0" v-for="question in questions" :key="question.hash">
			<UserQuestionsCard  :question="question"/>
		</div>


	</div>
</template>

<script lang="ts">


import UserQuestionsCard from '@/application/components/questions/UserQuestionsCard.vue'
import { useUserQuestionList } from '@/application/composable/users/user/questions'

export default  {
	name: 'profileQuestions',
	components: {  UserQuestionsCard },
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup(props: any) {
		const {
			filteredQuestions: questions, subjectId, error, loading, hasMore,
			answered, answeredChoices, fetchOlderQuestions
		} = useUserQuestionList(props.userId)
		return {
			questions, error, loading, hasMore, subjectId,
			answeredChoices, answered,
			fetchOlderQuestions
		}
	}
}
</script>
<style scoped>
ion-toolbar {
	--background: #F7F7FC;
}

</style>