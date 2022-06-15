<template>
	<DefaultLayout>
		<QuestionsList />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuestionsList from '@app/components/questions/questions/QuestionsList.vue'
import { useRouteMeta } from '@root/application/composable/core/states'

export default defineComponent({
	name: 'Questions',
	components: { QuestionsList },
	setup () {
		useRouteMeta('Questions', {})
	}
})
</script>
