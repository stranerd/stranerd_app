<template>
	<div class="col-span-12 flex flex-col px-3 normalText">
		<answer :is-profile="true"  v-for="answer in answers" :key="answer.hash" :answer="answer"></answer>
		<answer  :is-profile="true"></answer>
	</div>
</template>

<script lang="ts">

import { defineAsyncComponent } from 'vue'
const Answer = defineAsyncComponent(() => import('@/application/components/questions/answers/each.vue'))
import { useUserAnswerList } from '@/application/composable/users/user/answers'


export default  {
	name: 'profileAnswers',
	components: {  Answer },
	props: {
		userId: {
			type: String,
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