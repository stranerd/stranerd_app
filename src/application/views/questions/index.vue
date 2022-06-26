<template>
	<DefaultLayout>
		<template v-slot:panel>
			<QuestionsPanel />
		</template>
		<template v-slot:content-top-left>
			<div class="flex items-center gap-4">
				<IonSelect v-model="answered"
					class="w-40"
					interface="action-sheet"
					placeholder="State">
					<IonSelectOption v-for="choice in answeredChoices" :key="choice.key"
						:value="choice.val" @click="answered = choice.val">
						{{ choice.key }}
					</IonSelectOption>
				</IonSelect>
				<router-link to="/questions/create">
					<IonButton class="w-40 btn-primary">Ask a question</IonButton>
				</router-link>
			</div>
		</template>
		<QuestionsList />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuestionsList from '@app/components/questions/questions/QuestionsList.vue'
import { useRouteMeta } from '@root/application/composable/core/states'
import QuestionsPanel from '@app/components/layout/panels/QuestionsPanel.vue'
import { useQuestionList } from '@app/composable/questions/questions'

export default defineComponent({
	name: 'Questions',
	components: { QuestionsList, QuestionsPanel },
	setup () {
		const { tagId, answeredChoices, answered } = useQuestionList()
		useRouteMeta('All Questions', {})
		return { tagId, answeredChoices, answered }
	}
})
</script>
