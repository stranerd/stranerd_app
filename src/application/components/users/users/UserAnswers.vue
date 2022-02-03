<template>
	<div v-if="loading" class="col-span-12 flex items-center justify-center w-full py-8">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>

	<div v-else class="col-span-12 gap-4 flex flex-col text-body">
		<AnswerCard v-for="answer in answers" :key="answer.hash" :answer="answer" />
		<EmptyState v-if="!loading && !error && answers.length === 0"
			info="This user hasn't answered any questions yet." />
	</div>
</template>

<script lang="ts">
import AnswerCard from '@app/components/questions/answers/UserAnswerListCard.vue'
import { useUserAnswerList } from '@app/composable/users/user/answers'
import { IonProgressBar } from '@ionic/vue'
import EmptyState from '../../core/EmptyState.vue'
import { UserEntity } from '@modules/users'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ProfileAnswers',
	components: { AnswerCard, IonProgressBar, EmptyState },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const { answers, error, loading, hasMore, fetchOlderAnswers } = useUserAnswerList(props.user.id)
		return { answers, error, loading, hasMore, fetchOlderAnswers }
	}
})
</script>
