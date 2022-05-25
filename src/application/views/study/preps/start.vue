<template>
	<DashboardLayout>
		<div>
			<ExploreTestPrepsList />
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import ExploreTestPrepsList from '@app/components/study/testPreps/ExploreTestPrepsList.vue'

export default defineComponent({
	name: 'StudyPrepsStart',
	displayName: 'Choose exam',
	components: { DashboardLayout, ExploreTestPrepsList }
})
</script>
