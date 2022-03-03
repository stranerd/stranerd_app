<template>
	<DashboardLayout>
		<div class="md:px-4 md:py-4">
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
