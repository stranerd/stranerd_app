<template>
	<DashboardLayout>
		<QuestionsList />
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import QuestionsList from '@app/components/questions/questions/QuestionsList.vue'
import { useRouteMeta } from '@root/application/composable/core/states'

export default defineComponent({
	name: 'Questions',
	components: { QuestionsList, DashboardLayout },
	setup () {
		useRouteMeta('Questions', {})
	}
})
</script>
