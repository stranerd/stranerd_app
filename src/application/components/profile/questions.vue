<template>
	<div class="flex items-center justify-center w-full col-span-12 pt-12 px-5"  v-if="loading">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>

	<div class="col-span-12 flex flex-col px-3  normalText" v-else>
		<div class=" w-full md:px-2 md:py-3 mb-4 md:mb-0" v-for="question in questions" :key="question.hash">
			<UserQuestionsCard  :question="question"/>
		</div>


	</div>
</template>

<script lang="ts">


import UserQuestionsCard from '@/application/components/questions/UserQuestionsCard.vue'
import { useUserQuestionList } from '@/application/composable/users/user/questions'
import { IonProgressBar } from '@ionic/vue'

export default  {
	name: 'profileQuestions',
	components: {  UserQuestionsCard, IonProgressBar },
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