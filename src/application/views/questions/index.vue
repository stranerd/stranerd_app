<template>
	<DefaultLayout>
		<template v-slot:panel>
			<QuestionsPanel />
		</template>
		<template v-slot:header>
			<span class="font-bold text-2xl">All Questions</span>
		</template>
		<QuestionsList />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuestionsList from '@app/components/questions/questions/QuestionsList.vue'
import { useRouteMeta } from '@root/application/composable/core/states'
import QuestionsPanel from '@app/components/layout/panels/QuestionsPanel.vue'
export default defineComponent({
	name: 'All Questions',
	components: { QuestionsList, QuestionsPanel },
	setup () {
		useRouteMeta('Questions', {})
	}
})
</script>
 