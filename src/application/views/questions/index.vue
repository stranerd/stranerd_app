<template>
	<DashboardLayout>
		<div>
			<QuestionHeader />
			<QuestionsList />
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import QuestionsList from '@app/components/questions/questions/QuestionsList.vue'
import QuestionHeader from '@app/components/questions/questions/QuestionListHeader.vue'

export default defineComponent({
	name: 'Questions',
	displayName: 'Questions',
	components: { QuestionsList, DashboardLayout, QuestionHeader }
})
</script>
