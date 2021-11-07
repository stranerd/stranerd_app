<template>
	<div v-if="loading" class="flex items-center justify-center w-full col-span-12 pt-12 px-5">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>

	<div v-else class="col-span-12 flex flex-col px-3 normalText">
		<AnswerCard v-for="answer in answers" :key="answer.hash" :answer="answer"></AnswerCard>
	</div>
</template>

<script lang="ts">


import AnswerCard from '@app/components/questions/answers/UserAnswerListCard.vue'
import { useUserAnswerList } from '@app/composable/users/user/answers'
import { IonProgressBar } from '@ionic/vue'

export default {
	name: 'profileAnswers',
	components: { AnswerCard, IonProgressBar },
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
