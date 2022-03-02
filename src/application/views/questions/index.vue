<template>
	<DashboardLayout>
		<div>
			<QuestionsList />
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import QuestionsList from '@app/components/questions/questions/QuestionsList.vue'

export default defineComponent({
	name: 'Questions',
	displayName: 'Questions',
	components: { QuestionsList, DashboardLayout }
})
</script>
