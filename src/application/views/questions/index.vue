<template>
	<DefaultLayout>
		<template v-slot:content-top-left>
			<div class="flex items-center gap-4">
				<SelectTag v-model:value="tagId" :allowAll="true" class="w-40" />
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
import SelectTag from '@app/components/questions/questions/SelectTag.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { useQuestionList } from '@app/composable/questions/questions'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'Questions',
	components: { QuestionsList, SelectTag },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		const { tagId, answeredChoices, answered } = useQuestionList()
		useRouteMeta('Questions', {})
		return { tagId, answeredChoices, answered }
	}
})
</script>
