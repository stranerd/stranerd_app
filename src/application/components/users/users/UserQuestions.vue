<template>
	<div v-if="loading" class="col-span-12 flex items-center justify-center w-full py-8">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>
	<div v-else class="col-span-12 flex flex-col gap-4 text-body">
		<UserQuestionsCard v-for="question in questions" :key="question.hash" :question="question" />
		<div v-if="hasMore" class="text-center py-8 text-lg text-primary w-full font-semibold cursor-pointer">
			<a @click.prevent="fetchOlderQuestions">Load More</a>
		</div>
		<EmptyState v-if="!loading && !error && questions.length === 0"
			info="This user hasn't asked any questions yet" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonProgressBar } from '@ionic/vue'
import UserQuestionsCard from '@app/components/questions/questions/UserQuestionsListCard.vue'
import { useUserQuestionList } from '@app/composable/users/users/questions'
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
		const { questions, error, loading, hasMore, fetchOlderQuestions } = useUserQuestionList(props.user.id)
		return { questions, error, loading, hasMore, fetchOlderQuestions }
	}
})
</script>
