<template>
	<div v-if="loading" class="flex items-center justify-center w-full col-span-12 pt-12 px-5">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>

	<div v-else class="col-span-12 flex flex-col px-3 text-body">
		<template v-if="answers.length">
			<AnswerCard v-for="answer in answers" :key="answer.hash" :answer="answer" />
		</template>
		<EmptyState v-else info="This user hasn't answered any questions yet." />
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
