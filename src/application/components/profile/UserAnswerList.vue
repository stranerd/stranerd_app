<template>
	<div class="col-span-12 flex flex-col px-3 normalText">
		<AnswerCard   v-for="answer in answers" :key="answer.hash" :answer="answer"></AnswerCard>
	</div>
</template>

<script lang="ts">

import { defineAsyncComponent } from 'vue'
import AnswerCard from '@/application/components/questions/answers/AnswerListCard.vue'
import { useUserAnswerList } from '@/application/composable/users/user/answers'


export default  {
	name: 'profileAnswers',
	components: {  AnswerCard },
	props: {
		userId: {
			type: String ,
			required: true
		}
	},
	setup (props: any) {
		const { answers, error, loading, hasMore, fetchOlderAnswers } = useUserAnswerList(props.userId)
		return {
			answers, error, loading, hasMore,
			fetchOlderAnswers
		}
	}
}
</script>
<style scoped>
ion-toolbar {
	--background: #F7F7FC;
}

</style>